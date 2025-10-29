
        // StellariumViewer Class
        class StellariumViewer {
            constructor(rootElementId, config) {
                this.rootElement = document.getElementById(rootElementId);
                if (!this.rootElement) {
                    console.error(`Root element with ID '${rootElementId}' not found.`);
                    return;
                }

                // Instance properties, replacing global let variables
                this.loadingOverlay = this.rootElement.querySelector('.loading-overlay');
                this.viewingArea = this.rootElement; // The root element is also the viewing area
                this.scrollLeftButton = this.rootElement.querySelector('.scroll-left-button-overlay');
                this.scrollRightButton = this.rootElement.querySelector('.scroll-right-button-overlay');
                this.zoomInButtonOverlay = this.rootElement.querySelector('.zoom-in-button-overlay');
                this.zoomOutButtonOverlay = this.rootElement.querySelector('.zoom-out-button-overlay');
                this.panoramaCanvas = this.rootElement.querySelector('.panorama-canvas');
                this.panoramaCtx = this.panoramaCanvas ? this.panoramaCanvas.getContext('2d') : null;
                this.underlayTopDiv = this.rootElement.querySelector('.underlay-top-div');
                this.underlayBottomDiv = this.rootElement.querySelector('.underlay-bottom-div');
                this.gazetteerLabelsContainer = this.rootElement.querySelector('.gazetteer-labels-container');
                this.initialMessage = this.rootElement.querySelector('.initial-message');

                this.sourceImageCanvas = null;
                this.imageNativeWidth = 0;        
                this.imageNativeHeight = 0;       

                // Configurable properties
                this.horizonUrl = config.horizonUrl;
                this.initialZoom = config.initialZoom || 7.0737; 
                this.true0HorizonOffset = config.true0HorizonOffset || 11.90; 
                this.initialPanX = config.initialPanX || 0; 
                this.initialPanY = config.initialPanY || 0; 
                this.loadedGazetteerEntries = config.gazetteerEntries || [];

                // Internal state variables, ensuring they are always numbers
                this.currentZoom = Number.isFinite(this.initialZoom) ? this.initialZoom : 7.0737;
                this.currentPanX = Number.isFinite(this.initialPanX) ? this.initialPanX : 0;
                this.currentPanY = Number.isFinite(this.initialPanY) ? this.initialPanY : 0;

                this.panAnimationId = null;
                this.panDirection = 0;
                this.panClickTimeout = null; 

                // Constants (can be class constants or private static members if needed)
                this.MAX_TEXTURE_SIZE = 8192;
                this.PAN_SPEED = 200; 
                this.ZOOM_FACTOR = 1.1;
                this.LABEL_MAX_DIMENSION = 200;
                this.LABEL_OFFSET_Y = 10;
                this.VISUAL_HORIZON_OFFSET_DEGREES = 0;
                this.CONTINUOUS_PAN_INCREMENT = 32;
                this.CLICK_PAN_DEGREES = 1.0; 

                this.log(`StellariumViewer for ${rootElementId} initialized.`);

                // Attach event listeners
                this.addEventListeners();
                // Initial display adjustment and content load
                this.adjustImageDisplay();
                this.fetchAndProcessHardcodedFile();
            }

            // --- Console Logging Function (instance-specific) ---
            log(message) {
                // In a multi-viewer setup, logs go to the browser console.
                console.log(`[${this.rootElement.id} - ${new Date().toLocaleTimeString()}] ${message}`);
            }

            // --- Loading Overlay Functions (instance-specific) ---
            showLoading(message = 'Loading...') {
                if (this.loadingOverlay) {
                    this.loadingOverlay.textContent = message;
                    this.loadingOverlay.style.display = 'flex';
                } else {
                    this.log(`Loading: ${message}`);
                }
            }

            hideLoading() {
                if (this.loadingOverlay) {
                    this.loadingOverlay.style.display = 'none';
                }
            }

            // --- Animation Loop for continuous panning ---
            animatePan = () => { // Use arrow function to bind 'this'
                if (this.panDirection !== 0 && this.sourceImageCanvas) {
                    this.currentPanX += this.panDirection * this.CONTINUOUS_PAN_INCREMENT;
                    this.adjustImageDisplay();
                    this.panAnimationId = requestAnimationFrame(this.animatePan);
                }
            }

            // --- Stop Continuous Pan ---
            stopPan = () => { // Use arrow function to bind 'this'
                if (this.panAnimationId) {
                    cancelAnimationFrame(this.panAnimationId);
                    this.panAnimationId = null;
                    this.panDirection = 0; // Reset pan direction
                }
            }

            // --- UI Event Listeners ---
            addEventListeners() {
                if (this.zoomInButtonOverlay) {
                    this.zoomInButtonOverlay.addEventListener('click', () => {
                        if (!this.sourceImageCanvas) return;
                        this.currentZoom *= this.ZOOM_FACTOR;
                        this.currentZoom = Math.min(this.currentZoom, 100.0);
                        this.adjustImageDisplay();
                        this.log(`Zoom In. Current zoom: ${this.currentZoom.toFixed(2)}x`);
                    });
                } else {
                    this.log("Warning: zoomInButtonOverlay not found. Check HTML classes/structure.");
                }

                if (this.zoomOutButtonOverlay) {
                    this.zoomOutButtonOverlay.addEventListener('click', () => {
                        if (!this.sourceImageCanvas) return;
                        this.currentZoom /= this.ZOOM_FACTOR;
                        this.currentZoom = Math.max(this.currentZoom, 0.1);
                        this.adjustImageDisplay();
                        this.log(`Zoom Out. Current zoom: ${this.currentZoom.toFixed(2)}x`);
                    });
                } else {
                    this.log("Warning: zoomOutButtonOverlay not found. Check HTML classes/structure.");
                }

                // --- Click and Continuous scrolling on mouse down for scroll buttons ---
                // Left Scroll Button
                if (this.scrollLeftButton) {
                    // Click event for single step pan
                    this.scrollLeftButton.addEventListener('click', (event) => {
                        // Prevent continuous pan's mouseup from triggering this click if it was a hold
                        if (this.panClickTimeout === null) { // This means mousedown did NOT lead to continuous pan
                             // Check if image is loaded before attempting to pan
                            if (!this.sourceImageCanvas || this.imageNativeWidth === 0) return;

                            const pxPerDegreeScaled = (this.imageNativeWidth * this.currentZoom) / 360; // Pixels per degree at current zoom
                            this.currentPanX += this.CLICK_PAN_DEGREES * pxPerDegreeScaled;
                            this.adjustImageDisplay();
                            this.log(`Click Pan Left. Current pan: (${this.currentPanX.toFixed(0)}, ${this.currentPanY.toFixed(0)})`);
                        }
                    });

                    // Mouse down for continuous pan
                    this.scrollLeftButton.addEventListener('mousedown', (e) => {
                        if (!this.sourceImageCanvas) return;
                        this.panClickTimeout = setTimeout(() => {
                            this.panDirection = 1; // Pan right (moves view left)
                            this.animatePan();
                        }, 200); // Hold delay
                    });
                    this.scrollLeftButton.addEventListener('mouseup', () => {
                        clearTimeout(this.panClickTimeout); // Clear timeout if mouseup before hold delay
                        this.panClickTimeout = null; // Reset timeout ID for next click/hold
                        this.stopPan(); // Stop any continuous pan that might have started
                    });
                    this.scrollLeftButton.addEventListener('mouseleave', () => {
                        clearTimeout(this.panClickTimeout); // Clear timeout if mouse leaves before hold delay
                        this.panClickTimeout = null; // Reset timeout ID
                        this.stopPan();
                    });
                } else {
                    this.log("Warning: scrollLeftButton not found. Check HTML classes/structure.");
                }

                // Right Scroll Button
                if (this.scrollRightButton) {
                    // Click event for single step pan
                    this.scrollRightButton.addEventListener('click', (event) => {
                        // Only trigger single click if a continuous pan was NOT initiated by mousedown.
                        if (!this.sourceImageCanvas) return;
                        if (this.panDirection === 0) { // Only if not already in continuous pan
                            const pxPerDegreeScaled = (this.imageNativeWidth * this.currentZoom) / 360; // Pixels per degree at current zoom
                            this.currentPanX -= this.CLICK_PAN_DEGREES * pxPerDegreeScaled;
                            this.adjustImageDisplay();
                            this.log(`Click Pan Right. Current pan: (${this.currentPanX.toFixed(0)}, ${this.currentPanY.toFixed(0)})`);
                        }
                    });

                    // Mouse down for continuous pan
                    this.scrollRightButton.addEventListener('mousedown', (e) => {
                        if (!this.sourceImageCanvas) return;
                        this.panClickTimeout = setTimeout(() => {
                            this.panDirection = -1; // Pan left (moves view right)
                            this.animatePan();
                        }, 200); // Hold delay
                    });
                    this.scrollRightButton.addEventListener('mouseup', () => {
                        clearTimeout(this.panClickTimeout);
                        this.panClickTimeout = null;
                        this.stopPan();
                    });
                    this.scrollRightButton.addEventListener('mouseleave', () => {
                        clearTimeout(this.panClickTimeout);
                        this.panClickTimeout = null;
                        this.stopPan();
                    });
                } else {
                    this.log("Warning: scrollRightButton not found. Check HTML classes/structure.");
                }

                // Global keyboard events (attached to root element for scoping)
                this.rootElement.addEventListener('keydown', (event) => {
                    // Only respond to key events if the viewer is in focus or one of its children
                    if (!this.rootElement.contains(document.activeElement)) {
                        return;
                    }
                    if (!this.sourceImageCanvas) return;

                    let moved = false;
                    const effectivePanSpeedX = this.PAN_SPEED / this.currentZoom;
                    const effectivePanSpeedY = this.PAN_SPEED / this.currentZoom;

                    switch (event.key) {
                        case 'ArrowLeft':
                            this.currentPanX += effectivePanSpeedX;
                            moved = true;
                            break;
                        case 'ArrowRight':
                            this.currentPanX -= effectivePanSpeedX;
                            moved = true;
                            break;
                        case 'ArrowUp':
                            this.currentPanY += effectivePanSpeedY;
                            moved = true;
                            break;
                        case 'ArrowDown':
                            this.currentPanY -= effectivePanSpeedY;
                            moved = true;
                            break;
                        case '+':
                        case '=':
                            this.currentZoom *= this.ZOOM_FACTOR;
                            moved = true;
                            break;
                        case '-':
                            this.currentZoom /= this.ZOOM_FACTOR;
                            moved = true;
                            break;
                    }

                    this.currentZoom = Math.max(0.1, Math.min(this.currentZoom, 100.0));

                    if (moved) {
                        this.adjustImageDisplay();
                        this.log(`Keyboard Pan/Zoom. Current pan: (${this.currentPanX.toFixed(0)}, ${this.currentPanY.toFixed(0)}), Zoom: ${this.currentZoom.toFixed(2)}x`);
                    }
                });

                // Add mouse-based pan for viewer area itself
                let isDragging = false;
                let lastX, lastY;
                this.viewingArea.addEventListener('mousedown', (e) => {
                    isDragging = true;
                    lastX = e.clientX;
                    lastY = e.clientY;
                    this.viewingArea.style.cursor = 'grabbing';
                });

                this.viewingArea.addEventListener('mousemove', (e) => {
                    if (!isDragging) return;
                    const dx = e.clientX - lastX;
                    const dy = e.clientY - lastY;
                    this.currentPanX += dx;
                    this.currentPanY += dy;
                    lastX = e.clientX;
                    lastY = e.clientY;
                    this.adjustImageDisplay();
                });

                this.viewingArea.addEventListener('mouseup', () => {
                    isDragging = false;
                    this.viewingArea.style.cursor = 'default';
                });

                this.viewingArea.addEventListener('mouseleave', () => {
                    isDragging = false;
                    this.viewingArea.style.cursor = 'default';
                });

                // Add mouse wheel zoom
                this.viewingArea.addEventListener('wheel', (e) => {
                    e.preventDefault(); // Prevent page scrolling
                    if (!this.sourceImageCanvas) return;

                    const scaleAmount = this.ZOOM_FACTOR;
                    const mouseX = e.clientX - this.viewingArea.getBoundingClientRect().left;
                    const mouseY = e.clientY - this.viewingArea.getBoundingClientRect().top;

                    // Ensure panoramaCanvas.width and panoramaCanvas.height are not zero before division
                    const currentImageWidth = (this.panoramaCanvas.width && this.initialZoom) ? (this.panoramaCanvas.width / this.initialZoom * this.currentZoom) : 0;
                    const currentImageHeight = (this.panoramaCanvas.height && this.initialZoom) ? (this.panoramaCanvas.height / this.initialZoom * this.currentZoom) : 0;
                    
                    // Handle division by zero for relX and relY if currentImageWidth/Height is 0
                    const relX = currentImageWidth !== 0 ? (mouseX - (this.panoramaCanvas.width - currentImageWidth) / 2 - this.currentPanX) / currentImageWidth : 0;
                    const relY = currentImageHeight !== 0 ? (mouseY - (this.panoramaCanvas.height - currentImageHeight) / 2 - this.currentPanY) / currentImageHeight : 0;

                    if (e.deltaY < 0) { // Zoom in
                        this.currentZoom *= scaleAmount;
                    } else { // Zoom out
                        this.currentZoom /= scaleAmount;
                    }

                    this.currentZoom = Math.max(0.1, Math.min(this.currentZoom, 100.0));

                    // Adjust pan to zoom towards mouse cursor
                    const newImageWidth = (this.panoramaCanvas.width && this.initialZoom) ? (this.panoramaCanvas.width / this.initialZoom * this.currentZoom) : 0;
                    const newImageHeight = (this.panoramaCanvas.height && this.initialZoom) ? (this.panoramaCanvas.height / this.initialZoom * this.currentZoom) : 0;

                    this.currentPanX -= (newImageWidth - currentImageWidth) * relX;
                    this.currentPanY -= (newImageHeight - currentImageHeight) * relY;
                    
                    this.adjustImageDisplay();
                    this.log(`Mouse Wheel Zoom. Current zoom: ${this.currentZoom.toFixed(2)}x`);
                });

                // Listen for resize events on the viewer element itself, or the window
                window.addEventListener('resize', this.adjustImageDisplay.bind(this));
            }

            // --- Main Image Display and Adjustment Method ---
            adjustImageDisplay() {
                // Defensive checks: Ensure display state variables are numeric and finite
                if (!Number.isFinite(this.currentZoom)) {
                    this.log("Defensive reset: currentZoom was invalid, reset to " + this.initialZoom);
                    this.currentZoom = this.initialZoom;
                }
                if (!Number.isFinite(this.currentPanX)) {
                    this.log("Defensive reset: currentPanX was invalid, reset to " + this.initialPanX);
                    this.currentPanX = this.initialPanX;
                }
                if (!Number.isFinite(this.currentPanY)) {
                    this.log("Defensive reset: currentPanY was invalid, reset to " + this.initialPanY);
                    this.currentPanY = this.initialPanY;
                }

                if (!this.panoramaCanvas || !this.panoramaCtx || !this.viewingArea || !this.underlayTopDiv || !this.underlayBottomDiv || !this.gazetteerLabelsContainer) {
                    this.log("AdjustImageDisplay: Core elements or underlay divs not ready. Skipping display adjustment.");
                    return;
                }

                const viewerWidth = this.viewingArea.clientWidth;
                const viewerHeight = this.viewingArea.clientHeight;

                // Crucial check: Ensure viewer dimensions are valid before calculating scaled image dimensions
                if (viewerWidth <= 0 || viewerHeight <= 0 || !Number.isFinite(viewerWidth) || !Number.isFinite(viewerHeight)) {
                    this.log(`AdjustImageDisplay: Viewer dimensions are invalid (${viewerWidth}x${viewerHeight}). Skipping display adjustment.`);
                    return; // Prevent division by zero or NaN propagation
                }

                this.panoramaCanvas.width = viewerWidth;
                this.panoramaCanvas.height = viewerHeight;

                this.panoramaCtx.clearRect(0, 0, this.panoramaCanvas.width, this.panoramaCanvas.height);
                this.gazetteerLabelsContainer.innerHTML = ''; // Clear previous gazetteer labels

                // If no source image is loaded OR image dimensions are invalid, display the initial message and full underlays
                if (!this.sourceImageCanvas || this.imageNativeWidth <= 0 || this.imageNativeHeight <= 0) {
                    if (this.initialMessage) this.initialMessage.style.display = 'flex';
                    this.panoramaCanvas.style.display = 'none';
                    
                    this.underlayTopDiv.style.display = 'block';
                    this.underlayBottomDiv.style.display = 'block';

                    this.underlayTopDiv.style.width = '100%';
                    this.underlayTopDiv.style.height = '50%';
                    this.underlayTopDiv.style.left = '0';
                    this.underlayTopDiv.style.top = '0';

                    this.underlayBottomDiv.style.width = '100%';
                    this.underlayBottomDiv.style.height = '50%';
                    this.underlayBottomDiv.style.left = '0';
                    this.underlayBottomDiv.style.top = '50%';

                    this.log("AdjustImageDisplay: No valid source image loaded or dimensions invalid. Showing initial message and full underlays.");
                    return; // Exit early if image is not ready or has invalid dimensions
                }
                
                // Hide initial message and show canvas if an image is loaded
                if (this.initialMessage) this.initialMessage.style.display = 'none';
                this.panoramaCanvas.style.display = 'block';

                const imageAspect = this.imageNativeWidth / this.imageNativeHeight;
                const viewerAspect = viewerWidth / viewerHeight;

                let scaledWidth, scaledHeight;

                // Calculate scaled dimensions to fit within the viewer, maintaining aspect ratio
                if (viewerAspect > imageAspect) {
                    scaledHeight = viewerHeight * this.currentZoom;
                    scaledWidth = scaledHeight * imageAspect;
                } else {
                    scaledWidth = viewerWidth * this.currentZoom;
                    scaledHeight = scaledWidth / imageAspect;
                }

                // Explicitly check for NaN or Infinity after scaling calculations
                if (!Number.isFinite(scaledWidth) || !Number.isFinite(scaledHeight)) {
                    this.log(`AdjustImageDisplay: Scaled dimensions are not finite. scaledWidth: ${scaledWidth}, scaledHeight: ${scaledHeight}. Resetting source image and returning.`);
                    this.sourceImageCanvas = null; // Invalidate current image as it's causing calculation issues
                    this.imageNativeWidth = 0;
                    this.imageNativeHeight = 0;
                    // Adjust display to show loading message again
                    if (this.initialMessage) this.initialMessage.style.display = 'flex';
                    this.panoramaCanvas.style.display = 'none';
                    return; // Prevent TypeError on toFixed and other calculations below
                }


                // Clamping for currentPanY to prevent vertical scrolling beyond image boundaries
                const maxAllowedPanY = Math.max(0, (scaledHeight - viewerHeight) / 2);
                this.currentPanY = Math.max(-maxAllowedPanY, Math.min(maxAllowedPanY, this.currentPanY));

                // Destination Y position for drawing the image on the canvas
                const destY = (viewerHeight - scaledHeight) / 2 + this.currentPanY;


                // --- Draw Repeating Panorama Instances for Infinite Scroll ---
                // Calculate the X position of the panorama's 0-azimuth point on the canvas.
                const effectivePanoramaZeroAzimuthX = (viewerWidth - scaledWidth) / 2 + this.currentPanX;

                // Calculate the starting horizontal offset for drawing the repeating images.
                let startDrawingX = effectivePanoramaZeroAzimuthX % scaledWidth;
                if (startDrawingX > 0) {
                    startDrawingX -= scaledWidth; // Adjust to ensure it's on the left side of the screen or off-screen left
                }

                // Draw enough copies to cover the entire viewer width.
                for (let i = 0; i < 3; i++) {
                    const drawX = startDrawingX + (i * scaledWidth);
                    this.panoramaCtx.drawImage(
                        this.sourceImageCanvas,
                        0, 0,
                        this.sourceImageCanvas.width, this.sourceImageCanvas.height,
                        drawX, destY,
                        scaledWidth, scaledHeight
                    );
                }

                this.log(`AdjustImageDisplay: Image drawn. Scaled dimensions: ${scaledWidth.toFixed(0)}x${scaledHeight.toFixed(0)}, Pan: (${this.currentPanX.toFixed(0)}, ${this.currentPanY.toFixed(0)}), Zoom: ${this.currentZoom.toFixed(2)}x`);

                // Calculate pixels per degree altitude.
                const assumedVerticalFovDegrees = 60;
                const pxPerAltitudeDegreeScaled = scaledHeight / assumedVerticalFovDegrees;

                // Define the original Y position of the 0-degree horizon (bottom of the image relative to its drawing box)
                const originalImageHorizonY = destY + scaledHeight;

                // Calculate the Y position for the main white horizon line (at 0 degrees relative to image bottom)
                const HORIZON_LINE_Y = originalImageHorizonY - (this.VISUAL_HORIZON_OFFSET_DEGREES * pxPerAltitudeDegreeScaled);

                // Calculate the Y position for the new red "True 0 Horizon" line
                const TRUE_0_HORIZON_Y = originalImageHorizonY - (this.true0HorizonOffset * pxPerAltitudeDegreeScaled);


                // --- Draw Main Horizon Line, Degree Marks, and Cardinal Points ---
                this.panoramaCtx.strokeStyle = 'white';
                this.panoramaCtx.lineWidth = 2;
                this.panoramaCtx.beginPath();
                this.panoramaCtx.moveTo(0, HORIZON_LINE_Y);
                this.panoramaCtx.lineTo(viewerWidth, HORIZON_LINE_Y);
                this.panoramaCtx.stroke();

                const pxPerDegreeScaled = scaledWidth / 360; // Pixels per degree horizontally
                const smallTickLength = 8;
                const mediumTickLength = 15;
                const largeTickLength = 25;

                const HORIZON_FONT_SIZE = Math.max(12, Math.min(20, viewerWidth / 40));
                this.panoramaCtx.font = `${HORIZON_FONT_SIZE}px 'Inter', sans-serif`;
                this.panoramaCtx.fillStyle = 'white';
                this.panoramaCtx.textAlign = 'center';
                this.panoramaCtx.textBaseline = 'top';

                const CARDINAL_POINTS = {
                    0: 'N', 45: 'NE', 90: 'E', 135: 'SE', 180: 'S', 225: 'SW', 270: 'W', 315: 'NW'
                };

                // Calculate the range of raw degrees to iterate over to cover all visible panorama instances
                const degreesVisibleInViewer = viewerWidth / pxPerDegreeScaled;            
                const currentCenterPixelX = viewerWidth / 2;
                const centerAzimuthAtViewerCenter = ((currentCenterPixelX - effectivePanoramaZeroAzimuthX) / pxPerDegreeScaled);

                const startLoopDegree = Math.floor((centerAzimuthAtViewerCenter - degreesVisibleInViewer / 2 - 360) / 10) * 10;
                const endLoopDegree = Math.ceil((centerAzimuthAtViewerCenter + degreesVisibleInViewer / 2 + 360) / 10) * 10;


                for (let deg = startLoopDegree; deg <= endLoopDegree; deg++) {
                    const xPosOnCanvas = effectivePanoramaZeroAzimuthX + (deg * pxPerDegreeScaled);
                    const normalizedDeg = (deg % 360 + 360) % 360;                
                    
                    if (xPosOnCanvas >= -20 && xPosOnCanvas <= viewerWidth + 20) {
                        let tickLen = smallTickLength;
                        let label = '';
                        let isCardinal = false;

                        if (normalizedDeg % 10 === 0) {
                            tickLen = largeTickLength;
                            label = String(normalizedDeg);
                        } else if (normalizedDeg % 5 === 0) {
                            tickLen = mediumTickLength;
                        }

                        if (CARDINAL_POINTS[normalizedDeg]) {
                            tickLen = largeTickLength + 10;
                            label = CARDINAL_POINTS[normalizedDeg];
                            isCardinal = true;
                        }

                        this.panoramaCtx.beginPath();
                        this.panoramaCtx.moveTo(xPosOnCanvas, HORIZON_LINE_Y);
                        this.panoramaCtx.lineTo(xPosOnCanvas, HORIZON_LINE_Y - tickLen);
                        this.panoramaCtx.stroke();

                        if (label) {
                            if (isCardinal) {
                                this.panoramaCtx.font = `bold ${HORIZON_FONT_SIZE * 1.3}px 'Inter', sans-serif`;
                            } else {
                                this.panoramaCtx.font = `${HORIZON_FONT_SIZE}px 'Inter', sans-serif`;
                            }
                            this.panoramaCtx.fillText(label, xPosOnCanvas, HORIZON_LINE_Y - tickLen - (isCardinal ? 30 : 15));
                        }
                    }
                }


                // --- Draw True 0 Horizon Line (Red Line) ---
                this.panoramaCtx.strokeStyle = 'red';
                this.panoramaCtx.lineWidth = 1;
                this.panoramaCtx.beginPath();
                this.panoramaCtx.moveTo(0, TRUE_0_HORIZON_Y);
                this.panoramaCtx.lineTo(viewerWidth, TRUE_0_HORIZON_Y);
                this.panoramaCtx.stroke();


                // --- Adjust Underlay Divs to match image position ---
                this.underlayTopDiv.style.display = 'block';
                this.underlayTopDiv.style.width = viewerWidth + 'px';
                this.underlayTopDiv.style.height = HORIZON_LINE_Y + 'px';
                this.underlayTopDiv.style.left = '0';
                this.underlayTopDiv.style.top = '0';

                this.underlayBottomDiv.style.display = 'block';
                this.underlayBottomDiv.style.width = viewerWidth + 'px';
                this.underlayBottomDiv.style.height = (viewerHeight - HORIZON_LINE_Y) + 'px';
                this.underlayBottomDiv.style.left = '0';
                this.underlayBottomDiv.style.top = HORIZON_LINE_Y + 'px';

                // --- Draw Gazetteer Labels ---
                if (this.sourceImageCanvas && this.loadedGazetteerEntries.length > 0) {
                    this.drawGazetteerLabels(
                        this.panoramaCtx,
                        viewerWidth, viewerHeight,
                        scaledWidth, scaledHeight,
                        effectivePanoramaZeroAzimuthX,
                        destY,
                        pxPerDegreeScaled,
                        HORIZON_LINE_Y,
                        TRUE_0_HORIZON_Y
                    );
                }
            }

            /**
             * Draws gazetteer entry labels on the overlay container and connecting lines on the canvas.
             * Labels are positioned to avoid overlap where possible, preferring fixed vertical lanes.
             * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the panorama canvas.
             * @param {number} viewerWidth - Width of the viewing area.
             * @param {number} viewerHeight - Height of the viewing area.
             * @param {number} scaledWidth - Scaled width of the panorama image (360 degrees).
             * @param {number} scaledHeight - Scaled height of the panorama image.
             * @param {number} effectivePanoramaZeroAzimuthX - X-coordinate of the panorama's 0 azimuth on the canvas, can be outside viewer bounds due to infinite scrolling.
             * @param {number} destY - Y-coordinate of the panorama's top edge on the canvas.
             * @param {number} pxPerDegreeScaled - Pixels per degree horizontally on the scaled panorama.
             * @param {number} horizonLineY - Y-coordinate of the white horizon line on the canvas. Used for label positioning logic.
             * @param {number} trueHorizonRefY - Y-coordinate of the red true 0 horizon line on the canvas. Used for vertical line endpoint.
             */
            drawGazetteerLabels(ctx, viewerWidth, viewerHeight, scaledWidth, scaledHeight, effectivePanoramaZeroAzimuthX, destY, pxPerDegreeScaled, horizonLineY, trueHorizonRefY) {
                this.gazetteerLabelsContainer.innerHTML = ''; // Clear existing labels
                const occupiedRects = []; // Store [x, y, width, height] of successfully placed labels

                // Assumed vertical FOV for mapping altitude to pixels
                const assumedVerticalFovDegrees = 60;
                const pxPerAltitudeDegreeScaled = scaledHeight / assumedVerticalFovDegrees;

                // Sort entries by proximity to center of viewer to prefer central labels.
                // Also, prioritize higher altitude for labels at similar azimuths.
                const sortedEntries = [...this.loadedGazetteerEntries].sort((a, b) => {
                    const centerAzimuth = ((-this.currentPanX / pxPerDegreeScaled) % 360 + 360) % 360;
                    const azDistA = Math.abs((a.azimuth - centerAzimuth + 540) % 360 - 180);
                    const azDistB = Math.abs((b.azimuth - centerAzimuth + 540) % 360 - 180);

                    if (Math.abs(azDistA - azDistB) > 1) {
                        return azDistA - azDistB;
                    }
                    return b.altitude - a.altitude;
                });

                // Define "fixed" vertical lanes for labels
                const LABEL_HEIGHT_APPROX = 40;
                const LABEL_VERTICAL_SPACING = 5;
                const LANE_OFFSET_FROM_HORIZON = 20;
                const NUM_LANES = 5;

                const labelLanesY = [];
                for (let i = 0; i < NUM_LANES; i++) {
                    const laneTopY = horizonLineY - (LANE_OFFSET_FROM_HORIZON + LABEL_HEIGHT_APPROX) - (LABEL_HEIGHT_APPROX + LABEL_VERTICAL_SPACING) * i;
                    labelLanesY.push(laneTopY);
                }
                labelLanesY.sort((a, b) => a - b);


                sortedEntries.forEach(entry => {
                    // Calculate the true azimuth X position on the canvas, taking into account panorama wrapping
                    const trueAzimuthXOnCanvas = effectivePanoramaZeroAzimuthX + (entry.azimuth / 360) * scaledWidth;

                    const potentialXPoints = [];
                    potentialXPoints.push(trueAzimuthXOnCanvas);
                    potentialXPoints.push(trueAzimuthXOnCanvas - scaledWidth);
                    potentialXPoints.push(trueAzimuthXOnCanvas + scaledWidth);

                    let labelPlaced = false;
                    let labelDiv = null; // Declare labelDiv here, initialized to null

                    for (const azimuthXOfLabelAndLine of potentialXPoints) {
                        // Filter out azimuth points that are far off-screen horizontally
                        if (azimuthXOfLabelAndLine < -this.LABEL_MAX_DIMENSION || azimuthXOfLabelAndLine > viewerWidth + this.LABEL_MAX_DIMENSION) {
                            continue;
                        }

                        // Calculate the Y position where the vertical line will end (based on entry.altitude relative to trueHorizonRefY)
                        const lineEndPointY = trueHorizonRefY - (entry.altitude * pxPerAltitudeDegreeScaled);

                        // Skip if the calculated y position for the object itself is too far off-screen vertically.
                        if (lineEndPointY < -this.LABEL_MAX_DIMENSION * 2 || lineEndPointY > viewerHeight + this.LABEL_MAX_DIMENSION * 2) {
                            continue;
                        }

                        // Create labelDiv only once per entry when we are about to attempt placement
                        if (!labelDiv) { // Only create if it hasn't been created in a previous iteration for this entry
                            labelDiv = document.createElement('div');
                            labelDiv.className = 'gazetteer-label';
                            labelDiv.innerHTML = `
                                <div class="font-normal text-sm">${entry.name}</div>
                                <div class="text-xs">Az: ${entry.azimuth.toFixed(2)}° Alt: ${entry.altitude.toFixed(2)}°</div>
                            `;
                            this.gazetteerLabelsContainer.appendChild(labelDiv); // Add to measure
                            labelDiv.style.visibility = 'hidden'; // Hide while measuring
                        }

                        const labelWidth = labelDiv.offsetWidth;
                        const labelHeight = labelDiv.offsetHeight;

                        let finalLabelYTop = -1;

                        for (const laneY of labelLanesY) {
                            let proposedLabelLeftForRect = azimuthXOfLabelAndLine - (labelWidth / 2);
                            let proposedLabelY = laneY;

                            if (proposedLabelLeftForRect < 0) proposedLabelLeftForRect = 0;
                            if (proposedLabelLeftForRect + labelWidth > viewerWidth) proposedLabelLeftForRect = viewerWidth - labelWidth;
                            
                            if (proposedLabelY + labelHeight > horizonLineY - this.LABEL_OFFSET_Y) {
                                proposedLabelY = horizonLineY - this.LABEL_OFFSET_Y - labelHeight;
                            }
                            if (proposedLabelY < 0) proposedLabelY = 0;

                            const currentTestRect = {
                                x: proposedLabelLeftForRect,
                                y: proposedLabelY,
                                width: labelWidth,
                                height: labelHeight
                            };

                            let overlapsWithExisting = false;
                            for (const existingRect of occupiedRects) {
                                if (!(currentTestRect.x + currentTestRect.width < existingRect.x ||
                                        currentTestRect.x > existingRect.x + existingRect.width ||
                                        currentTestRect.y + currentTestRect.height < existingRect.y ||
                                        currentTestRect.y > existingRect.y + existingRect.height)) {
                                    overlapsWithExisting = true;
                                    break;
                                }
                            }

                            if (!overlapsWithExisting) {
                                finalLabelYTop = proposedLabelY;
                                break;
                            }
                        }

                        if (finalLabelYTop !== -1) {
                            labelDiv.style.left = `${azimuthXOfLabelAndLine}px`;
                            labelDiv.style.top = `${finalLabelYTop}px`;
                            labelDiv.style.visibility = 'visible';
                            
                            occupiedRects.push({
                                x: azimuthXOfLabelAndLine - (labelWidth / 2),
                                y: finalLabelYTop,
                                width: labelWidth,
                                height: labelHeight
                            });
                            labelPlaced = true;

                            ctx.strokeStyle = 'white';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(azimuthXOfLabelAndLine, finalLabelYTop + labelHeight);
                            ctx.lineTo(azimuthXOfLabelAndLine, lineEndPointY);
                            ctx.stroke();
                            break;
                        }
                    }

                    // Only attempt to remove labelDiv if it was actually created and not placed
                    if (!labelPlaced && labelDiv && labelDiv.parentNode === this.gazetteerLabelsContainer) {
                        this.gazetteerLabelsContainer.removeChild(labelDiv);
                        this.log(`Could not place label for "${entry.name}" at azimuth ${entry.azimuth}° due to overlaps or being off-screen. Removed temporary label.`);
                    } else if (!labelPlaced) {
                        // This else-if handles cases where labelDiv was never even created because all potentialXPoints were filtered early
                        this.log(`Could not place label for "${entry.name}" at azimuth ${entry.azimuth}° because all instances were off-screen horizontally.`);
                    }
                });
            }


            // --- File Processing Functions ---
            /**
             * Fetches the hardcoded ZIP file from URL and processes it.
             */
            async fetchAndProcessHardcodedFile() {
                this.log(`Attempting to fetch hardcoded file from URL: ${this.horizonUrl}`);
                this.showLoading('Loading panorama...');
                try {
                    const response = await fetch(this.horizonUrl);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const blob = await response.blob();
                    const file = new File([blob], 'hardcoded_horizon.zip', { type: blob.type });
                    await this.processFile(file);
                } catch (error) {
                    this.log(`Error fetching hardcoded file: ${error.message}`);
                    console.error('Fetch Error:', error);
                    this.hideLoading();
                }
            }

            /**
             * Processes a given File object (expected to be a .zip file).
             * Extracts panorama image and configuration from it.
             * @param {File} file - The file object to process.
             */
            async processFile(file) {
                if (!file.name.endsWith('.zip')) {
                    this.log('Error: Only .zip files are supported for Stellarium horizon files.');
                    this.hideLoading();
                    return;
                }

                this.sourceImageCanvas = null; // Clear previous image
                this.imageNativeWidth = 0;
                this.imageNativeHeight = 0;
                this.currentPanX = this.initialPanX; // Reset pan/zoom
                this.currentPanY = this.initialPanY;
                this.currentZoom = this.initialZoom;

                this.adjustImageDisplay(); // Show loading message and initial state

                try {
                    const reader = new FileReader();
                    reader.onload = async (e) => {
                        const arrayBuffer = e.target.result;
                        const zip = await JSZip.loadAsync(arrayBuffer);
                        this.log('Zip file loaded. Extracting contents...');

                        let iniFileContent = null;
                        const imageBlobUrls = {};

                        for (const relativePath in zip.files) {
                            const zipEntry = zip.files[relativePath];
                            if (zipEntry.dir) continue;

                            const lowerCasePath = relativePath.toLowerCase();

                            if (lowerCasePath.endsWith('.ini')) {
                                iniFileContent = zipEntry;
                                this.log(`Identified INI file: ${relativePath}`);
                            } else if (lowerCasePath.match(/\.(png|jpg|jpeg)$/i)) {
                                const blob = await zipEntry.async('blob');
                                const blobUrl = URL.createObjectURL(blob);
                                imageBlobUrls[relativePath] = blobUrl;
                                imageBlobUrls[relativePath.substring(relativePath.lastIndexOf('/') + 1)] = blobUrl; // Also store by basename
                                this.log(`Identified image file: ${relativePath}`);
                            }
                        }

                        if (!iniFileContent) {
                            throw new Error('No .ini file found in the zip archive.');
                        }

                        const iniText = await iniFileContent.async('text');
                        const panoramaConfig = this.parseIniFile(iniText);
                        let actualPanoramaConfig = null;

                        if (panoramaConfig.horizon) {
                            actualPanoramaConfig = panoramaConfig.horizon;
                            this.log("Using [horizon] section for configuration.");
                        } else if (panoramaConfig.landscape) {
                            actualPanoramaConfig = panoramaConfig.landscape;
                            if (!actualPanoramaConfig.type && actualPanoramaConfig.nbsidetex && actualPanoramaConfig.tex0) {
                                actualPanoramaConfig.type = 'old_style';
                                this.log("Assumed 'old_style' type from [landscape] section.");
                            }
                        }

                        if (!actualPanoramaConfig) {
                            throw new Error('Neither [horizon] nor [landscape] sections with valid configuration found in .ini file.');
                        }
                        
                        try {
                            if (actualPanoramaConfig.type === 'old_style' && actualPanoramaConfig.nbsidetex > 0) {
                                this.log(`Creating composite panorama from ${actualPanoramaConfig.nbsidetex} images.`);
                                this.sourceImageCanvas = await this.createCompositePanoramaCanvas(actualPanoramaConfig, imageBlobUrls);
                            } else if (['image', 'single_image'].includes(actualPanoramaConfig.type) && actualPanoramaConfig.file) {
                                this.log(`Loading single panorama image: "${actualPanoramaConfig.file}"`);
                                let imageUrl = imageBlobUrls[actualPanoramaConfig.file];
                                if (!imageUrl) { // Fallback to basename if full path fails
                                     imageUrl = imageBlobUrls[actualPanoramaConfig.file.substring(actualPanoramaConfig.file.lastIndexOf('/') + 1)];
                                }
                                if (!imageUrl) {
                                    throw new Error(`Image "${actualPanoramaConfig.file}" not found or Blob URL invalid.`);
                                }
                                this.sourceImageCanvas = await this.loadImageIntoCanvas(imageUrl);
                            } else {
                                this.log('No image-based panorama configuration found. Displaying default message.');
                                this.sourceImageCanvas = null;
                            }
                        } catch (imageLoadError) {
                            this.log(`Error loading or creating panorama image: ${imageLoadError.message}`);
                            console.error('Image Load Error:', imageLoadError);
                            this.sourceImageCanvas = null; // Ensure canvas is null on error
                        }
                        
                        // IMPORTANT: Validate image dimensions after loading (now handles null sourceImageCanvas gracefully)
                        if (this.sourceImageCanvas) {
                            this.imageNativeWidth = this.sourceImageCanvas.width;
                            this.imageNativeHeight = this.sourceImageCanvas.height;
                            // Explicit check for valid dimensions
                            if (this.imageNativeWidth <= 0 || this.imageNativeHeight <= 0) {
                                this.log(`Error: Loaded image has invalid dimensions: ${this.imageNativeWidth}x${this.imageNativeHeight}. Resetting source image.`);
                                this.sourceImageCanvas = null; // Invalidate if dimensions are bad
                                this.imageNativeWidth = 0; // Reset to 0
                                this.imageNativeHeight = 0; // Reset to 0
                            } else {
                                this.log(`Source image dimensions: ${this.imageNativeWidth}x${this.imageNativeHeight}px.`);
                            }
                        } else {
                            // If sourceImageCanvas is null at this point, ensure dimensions are zero
                            this.imageNativeWidth = 0;
                            this.imageNativeHeight = 0;
                        }

                        this.hideLoading();
                        this.log('File processing complete.');
                        this.adjustImageDisplay(); // Final display adjustment after image loads
                    };
                    reader.readAsArrayBuffer(file);
                }
                catch (error) {
                    this.log(`Error during file processing: ${error.message}`);
                    console.error('File Processing Error:', error);
                    this.hideLoading();
                }
            }

            /**
             * Parses the content of a Stellarium gazetteer file.
             * @param {string} gazetteerText - The full text content of the gazetteer file.
             * @returns {Array<Object>} An array of gazetteer entries with name, azimuth, and altitude.
             */
            parseGazetteerFile(gazetteerText) {
                const entries = [];
                gazetteerText.split('\n').forEach(line => {
                    line = line.trim();
                    if (!line || line.startsWith('#')) {
                        return;
                    }
                    const parts = line.split('|').map(s => s.trim());
                    if (parts.length >= 5) {
                        const azimuth = parseFloat(parts[0]);
                        const altitude = parseFloat(parts[1]);
                        const name = parts.slice(4).join('|').trim();
                        if (!isNaN(azimuth) && !isNaN(altitude) && name) {
                            entries.push({ name, azimuth, altitude });
                        }
                    }
                });
                return entries;
            }

            /**
             * Parses a basic INI file string into a JavaScript object.
             * Supports sections [like_this] and key=value pairs.
             * @param {string} iniText - The content of the INI file.
             * @returns {Object} A nested object representing the INI configuration.
             */
            parseIniFile(iniText) {
                const config = {};
                let currentSection = '';
                iniText.split('\n').forEach((line) => {
                    line = line.trim();
                    if (!line || line.startsWith(';') || line.startsWith('#')) return;

                    const sectionMatch = line.match(/^\[(.*?)\]$/);
                    if (sectionMatch) {
                        currentSection = sectionMatch[1].trim().toLowerCase();
                        config[currentSection] = {};
                    } else if (currentSection) {
                        const keyValueMatch = line.match(/^([^=]+)=(.*)$/);
                        if (keyValueMatch) {
                            const key = keyValueMatch[1].trim();
                            let value = keyValueMatch[2].trim();
                            if (!isNaN(parseFloat(value)) && isFinite(value)) {
                                value = parseFloat(value);
                            } else if (value.toLowerCase() === 'true') {
                                value = true;
                            } else if (value.toLowerCase() === 'false') {
                                value = false;
                            }
                            config[currentSection][key] = value;
                        }
                    }
                });
                return config;
            }

            /**
             * Loads an image from a URL into an HTML Canvas element.
             * @param {string} imageUrl - The URL of the image to load.
             * @returns {Promise<HTMLCanvasElement>} A promise that resolves with the canvas containing the image.
             */
            async loadImageIntoCanvas(imageUrl) {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.crossOrigin = "anonymous";
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        canvas.width = img.width;
                        canvas.height = img.height;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0);

                        // Pixel Manipulation: Replace opaque black (#000000) with #006994
                        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                        const data = imageData.data;
                        const targetR = 0; const targetG = 0; const targetB = 0;
                        const replaceR = 0; const replaceG = 105; const replaceB = 148;

                        for (let i = 0; i < data.length; i += 4) {
                            if (data[i] === targetR && data[i+1] === targetG && data[i+2] === targetB && data[i+3] > 0) {
                                data[i] = replaceR;
                                data[i+1] = replaceG;
                                data[i+2] = replaceB;
                                data[i+3] = 255;
                            }
                        }
                        ctx.putImageData(imageData, 0, 0);

                        URL.revokeObjectURL(imageUrl);
                        resolve(canvas);
                    };
                    img.onerror = (e) => {
                        reject(new Error(`Failed to load image from ${imageUrl}: ${e.message || e.target.error || 'Unknown error'}`));
                    };
                    img.src = imageUrl;
                });
            }

            /**
             * Creates a single composite canvas from multiple panorama image parts,
             * typically used for "old_style" Stellarium landscapes.
             * @param {Object} config - The panorama configuration object from the INI file.
             * @param {Object.<string, string>} imageBlobUrls - Map of image filenames/paths to their Blob URLs.
             * @returns {Promise<HTMLCanvasElement>} A promise that resolves with the composite canvas.
             */
            async createCompositePanoramaCanvas(config, imageBlobUrls) {
                const nbsidetex = config.nbsidetex;
                if (!nbsidetex || nbsidetex <= 0) {
                    throw new Error("nbsidetex is not defined or invalid for composite panorama.");
                }

                const imagesToLoad = [];
                for (let i = 0; i < nbsidetex; i++) {
                    const texKey = `tex${i}`;
                    const imageFileName = config[texKey];
                    if (!imageFileName) {
                        this.log(`Warning - Missing image file for ${texKey} in config. Skipping.`); 
                        continue;
                    }
                    let imageUrl = imageBlobUrls[imageFileName];
                    if (!imageUrl) { // Fallback to basename if full path fails
                        imageUrl = imageBlobUrls[imageFileName.substring(imageFileName.lastIndexOf('/') + 1)];
                    }
                    if (!imageUrl) {
                        this.log(`Error - Composite image part "${imageFileName}" not found.`); 
                        continue;
                    }
                    
                    imagesToLoad.push(new Promise((resolve, reject) => {
                        const img = new Image();
                        img.crossOrigin = "anonymous";
                        img.onload = () => resolve(img);
                        img.onerror = (e) => reject(new Error(`Failed to load composite image part "${imageFileName}": ${e.message || e.target.error || 'Unknown error'}`));
                        img.src = imageUrl;
                    }));
                }

                const loadedImages = await Promise.all(imagesToLoad);
                if (loadedImages.length === 0) {
                    throw new Error("No images were successfully loaded for composite panorama creation.");
                }

                let totalWidth = 0;
                let maxHeight = 0;
                loadedImages.forEach(img => {
                    totalWidth += img.width;
                    maxHeight = Math.max(maxHeight, img.height);
                });

                const canvas = document.createElement('canvas');
                canvas.width = totalWidth;
                canvas.height = maxHeight;
                const ctx = canvas.getContext('2d');

                let currentX = 0;
                loadedImages.forEach((img) => {
                    ctx.drawImage(img, currentX, 0, img.width, img.height);
                    currentX += img.width;
                });

                // Pixel Manipulation: Replace opaque black (#000000) with #006994
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;
                const targetR = 0; const targetG = 0; const targetB = 0;
                const replaceR = 0; const replaceG = 105; const replaceB = 148;

                for (let i = 0; i < data.length; i += 4) {
                    if (data[i] === targetR && data[i+1] === targetG && data[i+2] === targetB && data[i+3] > 0) {
                        data[i] = replaceR;
                        data[i+1] = replaceG;
                        data[i+2] = replaceB;
                        data[i+3] = 255;
                    }
                }
                ctx.putImageData(imageData, 0, 0);
                
                // Downscale composite canvas if too large for GPU texture limits
                let finalCanvas = canvas;
                if (canvas.width > this.MAX_TEXTURE_SIZE || canvas.height > this.MAX_TEXTURE_SIZE) {
                    this.log(`Composite canvas (${canvas.width}x${canvas.height}) exceeds MAX_TEXTURE_SIZE (${this.MAX_TEXTURE_SIZE}). Downscaling...`); 
                    const scaleFactor = Math.min(this.MAX_TEXTURE_SIZE / canvas.width, this.MAX_TEXTURE_SIZE / canvas.height);
                    const downscaledCanvas = document.createElement('canvas');
                    downscaledCanvas.width = Math.floor(canvas.width * scaleFactor);
                    downscaledCanvas.height = Math.floor(canvas.height * scaleFactor);
                    const downscaledCtx = downscaledCanvas.getContext('2d');
                    downscaledCtx.imageSmoothingEnabled = true;
                    downscaledCtx.imageSmoothingQuality = 'high';
                    downscaledCtx.drawImage(canvas, 0, 0, downscaledCanvas.width, downscaledCanvas.height);
                    finalCanvas = downscaledCanvas;
                    this.log(`Downscaled to ${finalCanvas.width}x${finalCanvas.height} pixels.`); 
                }

                // Revoke all Blob URLs after the composite canvas is finalized to free memory
                for (const url of Object.values(imageBlobUrls)) {
                    try {
                        URL.revokeObjectURL(url);
                    } catch (e) { /* ignore errors during revocation */ }
                }
                return finalCanvas;
            }
        }

        // --- Initialize multiple StellariumViewer instances on window load ---
        window.onload = function() {
            // Configuration for Viewer 1
            const viewer1Config = {
                // Horizon URL for Carrowmore-SL014-209030 (Sligo, Ireland)
                horizonUrl: 'https://www.standingstones.org/standingstonesorg/bd/co-westmeath/viewpoint/hill-of-uisneach_/hill-of-uisneach_.zip', 
                initialZoom: 7.0737,
                true0HorizonOffset: 11.90,
                initialPanX: 0, 
                initialPanY: 0, 
                gazetteerEntries: [
                    { "name": "Carrowmore Point A", "azimuth": 0.0, "altitude": 0.0 },
                    { "name": "Carrowmore Point B", "azimuth": 180.0, "altitude": 0.0 },
                    { "name": "Carrowmore Mound", "azimuth": 209.03, "altitude": 0.0 }
                ]
            };

            // Configuration for Viewer 2 (Carrowkeel-SL040-096, Sligo, Ireland)
            const viewer2Config = {
                horizonUrl: 'https://www.standingstones.org/standingstonesorg/bd/sligo/viewpoint/carrowkeel-sl040-096-_/carrowkeel-sl040-096-_.zip',
                initialZoom: 6.5, 
                true0HorizonOffset: 10.0, 
                initialPanX: 0, 
                initialPanY: 0, 
                gazetteerEntries: [
                    { "name": "Carrowkeel Cairn C", "azimuth": 96.0, "altitude": 0.0 },
                    { "name": "Carrowkeel Peak", "azimuth": 275.0, "altitude": 15.0 },
                    { "name": "Carrowkeel North", "azimuth": 0.0, "altitude": 0.0 }
                ]
            };

            // Create instances of StellariumViewer
            new StellariumViewer('viewer1', viewer1Config);
            new StellariumViewer('viewer2', viewer2Config);

            console.log('All StellariumViewer instances initialized.');
        };
