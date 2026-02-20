// Pizza Community Map Data Manager

class PizzaMapData {
    constructor() {
        this.storageKey = 'pizza_map_locations';
        this.donationsStorageKey = 'pizza_map_donations';
        this.defaultLocations = [
            {
                id: 1,
                name: "Tastee Pizza",
                city: "Hawthorne",
                country: "USA",
                state: "NJ",
                lat: 40.9495,
                lng: -74.1535,
                status: "active",
                meals_served: 2800,
                partners: 5,
                description: "Family-owned pizzeria serving the Hawthorne community since 1982",
                contact: "tastee@pizzacommunity.org",
                established: "2023-10-15"
            },
            {
                id: 2,
                name: "ROCK N GRILL",
                city: "Glen Rock",
                country: "USA",
                state: "NJ",
                lat: 40.9629,
                lng: -74.1329,
                status: "active",
                meals_served: 3200,
                partners: 8,
                description: "Local favorite serving Glen Rock and surrounding areas",
                contact: "rockngrill@pizzacommunity.org",
                established: "2023-11-20"
            },
            {
                id: 3,
                name: "Uncle Louie's",
                city: "Franklin Lakes",
                country: "USA",
                state: "NJ",
                lat: 41.0168,
                lng: -74.2057,
                status: "active",
                meals_served: 2400,
                partners: 6,
                description: "Community-focused pizzeria in Franklin Lakes",
                contact: "unclelouies@pizzacommunity.org",
                established: "2023-09-10"
            },
            {
                id: 4,
                name: "Haledon Pizza",
                city: "Haledon",
                country: "USA",
                state: "NJ",
                lat: 40.9354,
                lng: -74.1863,
                status: "active",
                meals_served: 1900,
                partners: 4,
                description: "Serving the Haledon community with fresh pizza daily",
                contact: "haledon@pizzacommunity.org",
                established: "2023-08-25"
            },
            {
                id: 5,
                name: "JJ's Pizza",
                city: "Wyandotte",
                country: "USA",
                state: "MI",
                lat: 42.2142,
                lng: -83.1499,
                status: "active",
                meals_served: 3600,
                partners: 9,
                description: "Michigan's favorite since 1974, serving Wyandotte and beyond",
                contact: "jjs@pizzacommunity.org",
                established: "2023-12-05"
            },
            {
                id: 6,
                name: "Coastal Smash",
                city: "Bradenton",
                country: "USA",
                state: "FL",
                lat: 27.4989,
                lng: -82.5748,
                status: "active",
                meals_served: 4100,
                partners: 12,
                description: "Florida's coastal pizza destination in Bradenton",
                contact: "coastalsmash@pizzacommunity.org",
                established: "2023-07-15"
            },
            {
                id: 7,
                name: "Domino's Pizza",
                city: "Chicago",
                country: "USA",
                state: "IL",
                lat: 41.8781,
                lng: -87.6298,
                status: "active",
                meals_served: 5200,
                partners: 15,
                description: "Chicago's premier Domino's location serving the downtown area",
                contact: "chicago@pizzacommunity.org",
                established: "2023-06-20"
            }
        ];

        this.defaultDonations = [
            {
                id: 1,
                name: "New Mexico Community Kitchen",
                city: "Albuquerque",
                country: "USA",
                state: "NM",
                lat: 35.0844,
                lng: -106.6504,
                status: "active",
                meals_donated: 250,
                description: "Supporting local families in New Mexico with pizza donations",
                contact: "newmexico@pizzacommunity.org",
                established: "2023-08-15"
            },
            {
                id: 2,
                name: "New Delhi Food Relief",
                city: "New Delhi",
                country: "India",
                state: "Delhi",
                lat: 28.6139,
                lng: 77.2090,
                status: "active",
                meals_donated: 300,
                description: "Providing pizza meals to underprivileged communities in Delhi",
                contact: "newdelhi@pizzacommunity.org",
                established: "2023-09-20"
            },
            {
                id: 3,
                name: "Lagos Hunger Relief",
                city: "Lagos",
                country: "Nigeria",
                state: "Lagos",
                lat: 6.5244,
                lng: 3.3792,
                status: "active",
                meals_donated: 200,
                description: "Fighting hunger in Lagos with community pizza donations",
                contact: "lagos@pizzacommunity.org",
                established: "2023-07-10"
            },
            {
                id: 4,
                name: "Chicago Community Outreach",
                city: "Chicago",
                country: "USA",
                state: "IL",
                lat: 41.8781,
                lng: -87.6298,
                status: "active",
                meals_donated: 280,
                description: "Serving Chicago's communities with pizza donation programs",
                contact: "chicago-donations@pizzacommunity.org",
                established: "2023-06-25"
            },
            {
                id: 5,
                name: "Detroit Food Security Initiative",
                city: "Detroit",
                country: "USA",
                state: "MI",
                lat: 42.3314,
                lng: -83.0458,
                status: "active",
                meals_donated: 220,
                description: "Supporting Detroit families through pizza donation drives",
                contact: "detroit@pizzacommunity.org",
                established: "2023-10-05"
            },
            {
                id: 6,
                name: "Florida Community Support",
                city: "Miami",
                country: "USA",
                state: "FL",
                lat: 25.7617,
                lng: -80.1918,
                status: "active",
                meals_donated: 250,
                description: "Bringing pizza joy to Florida communities in need",
                contact: "florida@pizzacommunity.org",
                established: "2023-11-12"
            }
        ];
        
        this.initializeData();
    }

    initializeData() {
        // Clear any existing cached data to force refresh with new locations
        localStorage.removeItem(this.storageKey);
        localStorage.removeItem(this.donationsStorageKey);
        
        if (!localStorage.getItem(this.storageKey)) {
            this.saveLocations(this.defaultLocations);
            console.log('Initialized map with new default locations:', this.defaultLocations);
        } else {
            // Migrate any locations with old 'in-progress' status to 'progress'
            this.migrateStatusValues();
        }

        if (!localStorage.getItem(this.donationsStorageKey)) {
            this.saveDonations(this.defaultDonations);
            console.log('Initialized map with donation locations:', this.defaultDonations);
        }
    }

    migrateStatusValues() {
        const locations = this.getLocations();
        let hasChanges = false;
        
        locations.forEach(location => {
            if (location.status === 'in-progress') {
                location.status = 'progress';
                hasChanges = true;
            }
        });
        
        if (hasChanges) {
            this.saveLocations(locations);
            console.log('Migrated location status values from "in-progress" to "progress"');
        }
    }

    getLocations() {
        const stored = localStorage.getItem(this.storageKey);
        return stored ? JSON.parse(stored) : this.defaultLocations;
    }

    saveLocations(locations) {
        localStorage.setItem(this.storageKey, JSON.stringify(locations));
    }

    getDonations() {
        const stored = localStorage.getItem(this.donationsStorageKey);
        return stored ? JSON.parse(stored) : this.defaultDonations;
    }

    saveDonations(donations) {
        localStorage.setItem(this.donationsStorageKey, JSON.stringify(donations));
    }

    addLocation(location) {
        const locations = this.getLocations();
        const newId = Math.max(...locations.map(l => l.id), 0) + 1;
        location.id = newId;
        location.established = location.established || new Date().toISOString().split('T')[0];
        locations.push(location);
        this.saveLocations(locations);
        return location;
    }

    updateLocation(id, updatedData) {
        const locations = this.getLocations();
        const index = locations.findIndex(l => l.id === parseInt(id));
        if (index !== -1) {
            locations[index] = { ...locations[index], ...updatedData };
            this.saveLocations(locations);
            return locations[index];
        }
        return null;
    }

    deleteLocation(id) {
        const locations = this.getLocations();
        const filtered = locations.filter(l => l.id !== parseInt(id));
        this.saveLocations(filtered);
        return filtered;
    }

    getLocationsByStatus(status) {
        return this.getLocations().filter(l => l.status === status);
    }

    getLocationById(id) {
        const locations = this.getLocations();
        return locations.find(l => l.id === parseInt(id));
    }

    getTotalStats() {
        const partnerLocations = this.getLocations();
        const donationLocations = this.getDonations();
        const allLocations = [...partnerLocations, ...donationLocations];
        
        return {
            totalLocations: allLocations.length,
            partnerLocations: partnerLocations.length,
            donationLocations: donationLocations.length,
            activeLocations: allLocations.filter(l => l.status === 'active').length,
            totalMeals: partnerLocations.reduce((sum, l) => sum + (l.meals_served || 0), 0),
            totalDonatedMeals: donationLocations.reduce((sum, l) => sum + (l.meals_donated || 0), 0),
            totalPartners: partnerLocations.reduce((sum, l) => sum + (l.partners || 0), 0)
        };
    }

    // Add method to force refresh map data
    forceRefresh() {
        localStorage.removeItem(this.storageKey);
        localStorage.removeItem(this.donationsStorageKey);
        this.saveLocations(this.defaultLocations);
        this.saveDonations(this.defaultDonations);
        console.log('Forced refresh of map data with new locations and donations');
        return { partners: this.getLocations(), donations: this.getDonations() };
    }
}

// Global instance
window.pizzaMapData = new PizzaMapData();

// Map initialization and management
class PizzaInteractiveMap {
    constructor(containerId) {
        this.containerId = containerId;
        this.map = null;
        this.partnerMarkers = [];
        this.donationMarkers = [];
        this.showPartners = true;
        this.showDonations = true;
        this.currentLocationIndex = 0;
        this.allLocations = [];
        this.init();
    }

    init() {
        if (!document.getElementById(this.containerId)) {
            console.warn('Map container not found - this is normal if map is not initialized yet');
            return;
        }

        if (typeof L === 'undefined') {
            console.warn('Leaflet library not loaded - map functionality disabled');
            return;
        }

        try {
            // Initialize the map
            this.map = L.map(this.containerId, {
                zoomControl: true,
                scrollWheelZoom: true
            }).setView([20, 0], 2);
        } catch (error) {
            console.error('Failed to initialize map:', error);
            return;
        }

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors | Pizza Community',
            maxZoom: 18
        }).addTo(this.map);

        // Create legend
        this.createLegend();

        // Load and display locations
        this.loadLocations();

        // Auto-refresh every 30 seconds
        setInterval(() => {
            this.refreshLocations();
        }, 30000);
    }

    getMarkerIcon(status, type = 'partner') {
        const iconConfigs = {
            partner: {
                active: { color: '#4CAF50', icon: '🍽️' },
                progress: { color: '#ff9800', icon: '🔧' },
                planned: { color: '#757575', icon: '📍' }
            },
            donation: {
                active: { color: '#e91e63', icon: '🍕' },
                progress: { color: '#ff5722', icon: '🍕' },
                planned: { color: '#9c27b0', icon: '🍕' }
            }
        };

        const config = iconConfigs[type][status] || iconConfigs[type].planned;
        
        return L.divIcon({
            className: 'custom-marker',
            html: `<div class="marker-pin" style="background-color: ${config.color}">
                     <span class="marker-icon">${config.icon}</span>
                   </div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 30],
            popupAnchor: [0, -30]
        });
    }

    createPopupContent(location, type = 'partner') {
        const statusText = {
            active: 'Active',
            progress: 'In Progress',
            planned: 'Planned'
        };

        if (type === 'donation') {
            return `
                <div class="map-popup">
                    <h3>${location.name}</h3>
                    <p class="location-city">${location.city}, ${location.country}</p>
                    <div class="status-badge status-${location.status}">
                        ${statusText[location.status]} Donation Site
                    </div>
                    <div class="location-stats">
                        <div class="stat">
                            <strong>${location.meals_donated || 0}</strong>
                            <span>Meals Donated</span>
                        </div>
                    </div>
                    <p class="location-description">${location.description}</p>
                    ${location.established ? `<p class="established">Est. ${new Date(location.established).toLocaleDateString()}</p>` : ''}
                    <a href="mailto:${location.contact}" class="contact-link">
                        <i class="fas fa-envelope"></i> Contact
                    </a>
                </div>
            `;
        }

        return `
            <div class="map-popup">
                <h3>${location.name}</h3>
                <p class="location-city">${location.city}, ${location.country}</p>
                <div class="status-badge status-${location.status}">
                    ${statusText[location.status]} Partner
                </div>
                <div class="location-stats">
                    <div class="stat">
                        <strong>${location.meals_served || 0}</strong>
                        <span>Meals Served</span>
                    </div>
                    <div class="stat">
                        <strong>${location.partners || 0}</strong>
                        <span>Partners</span>
                    </div>
                </div>
                <p class="location-description">${location.description}</p>
                ${location.established ? `<p class="established">Est. ${new Date(location.established).toLocaleDateString()}</p>` : ''}
                <a href="mailto:${location.contact}" class="contact-link">
                    <i class="fas fa-envelope"></i> Contact
                </a>
            </div>
        `;
    }

    createLegend() {
        const legend = L.control({ position: 'topright' });
        
        legend.onAdd = () => {
            const div = L.DomUtil.create('div', 'map-legend');
            div.innerHTML = `
                <div class="legend-header">
                    <h4>🍕 Pizza Map</h4>
                </div>
                <div class="legend-controls">
                    <label class="legend-toggle">
                        <input type="checkbox" id="toggle-partners" checked>
                        <span class="toggle-icon">🍽️</span> Partners
                    </label>
                    <label class="legend-toggle">
                        <input type="checkbox" id="toggle-donations" checked>
                        <span class="toggle-icon">🍕</span> Donations
                    </label>
                </div>
                <div class="legend-navigation">
                    <button id="prev-location" class="nav-btn">◀</button>
                    <span id="location-counter">1 / 1</span>
                    <button id="next-location" class="nav-btn">▶</button>
                </div>
            `;
            
            // Prevent map interactions when clicking on legend
            L.DomEvent.disableClickPropagation(div);
            L.DomEvent.disableScrollPropagation(div);
            
            return div;
        };
        
        legend.addTo(this.map);
        
        // Add event listeners after legend is added to DOM
        setTimeout(() => {
            this.setupLegendEventListeners();
        }, 100);
    }

    setupLegendEventListeners() {
        const partnersToggle = document.getElementById('toggle-partners');
        const donationsToggle = document.getElementById('toggle-donations');
        const prevBtn = document.getElementById('prev-location');
        const nextBtn = document.getElementById('next-location');
        
        if (partnersToggle) {
            partnersToggle.addEventListener('change', (e) => {
                this.showPartners = e.target.checked;
                this.updateMarkerVisibility();
                this.updateLocationsList();
            });
        }
        
        if (donationsToggle) {
            donationsToggle.addEventListener('change', (e) => {
                this.showDonations = e.target.checked;
                this.updateMarkerVisibility();
                this.updateLocationsList();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.navigateToLocation(-1));
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.navigateToLocation(1));
        }
    }

    loadLocations() {
        // Clear existing markers
        this.clearMarkers();

        // Load partner locations
        const partnerLocations = window.pizzaMapData.getLocations();
        partnerLocations.forEach(location => {
            if (location.lat && location.lng) {
                const marker = L.marker([location.lat, location.lng], {
                    icon: this.getMarkerIcon(location.status, 'partner')
                });

                if (this.showPartners) {
                    marker.addTo(this.map);
                }

                marker.bindPopup(this.createPopupContent(location, 'partner'), {
                    maxWidth: 300,
                    className: 'pizza-popup'
                });

                marker.locationId = location.id;
                marker.locationType = 'partner';
                marker.locationData = location;
                this.partnerMarkers.push(marker);
            }
        });

        // Load donation locations
        const donationLocations = window.pizzaMapData.getDonations();
        donationLocations.forEach(location => {
            if (location.lat && location.lng) {
                const marker = L.marker([location.lat, location.lng], {
                    icon: this.getMarkerIcon(location.status, 'donation')
                });

                if (this.showDonations) {
                    marker.addTo(this.map);
                }

                marker.bindPopup(this.createPopupContent(location, 'donation'), {
                    maxWidth: 300,
                    className: 'pizza-popup'
                });

                marker.locationId = location.id;
                marker.locationType = 'donation';
                marker.locationData = location;
                this.donationMarkers.push(marker);
            }
        });

        this.updateLocationsList();
    }

    updateMarkerVisibility() {
        // Update partner markers visibility
        this.partnerMarkers.forEach(marker => {
            if (this.showPartners) {
                marker.addTo(this.map);
            } else {
                this.map.removeLayer(marker);
            }
        });

        // Update donation markers visibility
        this.donationMarkers.forEach(marker => {
            if (this.showDonations) {
                marker.addTo(this.map);
            } else {
                this.map.removeLayer(marker);
            }
        });
    }

    updateLocationsList() {
        this.allLocations = [];
        
        if (this.showPartners) {
            this.allLocations = this.allLocations.concat(this.partnerMarkers);
        }
        
        if (this.showDonations) {
            this.allLocations = this.allLocations.concat(this.donationMarkers);
        }
        
        this.currentLocationIndex = 0;
        this.updateLocationCounter();
    }

    updateLocationCounter() {
        const counter = document.getElementById('location-counter');
        if (counter) {
            const total = this.allLocations.length;
            const current = total > 0 ? this.currentLocationIndex + 1 : 0;
            counter.textContent = `${current} / ${total}`;
        }
    }

    navigateToLocation(direction) {
        if (this.allLocations.length === 0) return;
        
        this.currentLocationIndex += direction;
        
        if (this.currentLocationIndex >= this.allLocations.length) {
            this.currentLocationIndex = 0;
        } else if (this.currentLocationIndex < 0) {
            this.currentLocationIndex = this.allLocations.length - 1;
        }
        
        const marker = this.allLocations[this.currentLocationIndex];
        if (marker) {
            this.map.setView(marker.getLatLng(), 8);
            marker.openPopup();
            this.updateLocationCounter();
        }
    }

    refreshLocations() {
        this.loadLocations();
    }

    clearMarkers() {
        this.partnerMarkers.forEach(marker => {
            this.map.removeLayer(marker);
        });
        this.donationMarkers.forEach(marker => {
            this.map.removeLayer(marker);
        });
        this.partnerMarkers = [];
        this.donationMarkers = [];
    }

    addLocation(location, type = 'partner') {
        if (location.lat && location.lng) {
            const marker = L.marker([location.lat, location.lng], {
                icon: this.getMarkerIcon(location.status, type)
            }).addTo(this.map);

            marker.bindPopup(this.createPopupContent(location, type), {
                maxWidth: 300,
                className: 'pizza-popup'
            });

            marker.locationId = location.id;
            marker.locationType = type;
            marker.locationData = location;

            if (type === 'partner') {
                this.partnerMarkers.push(marker);
            } else {
                this.donationMarkers.push(marker);
            }

            // Center map on new location
            this.map.setView([location.lat, location.lng], 8);
            this.updateLocationsList();
        }
    }

    removeLocation(locationId, type = 'partner') {
        const markers = type === 'partner' ? this.partnerMarkers : this.donationMarkers;
        const markerIndex = markers.findIndex(marker => marker.locationId === parseInt(locationId));
        if (markerIndex !== -1) {
            this.map.removeLayer(markers[markerIndex]);
            markers.splice(markerIndex, 1);
            this.updateLocationsList();
        }
    }
}

// Initialize map when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('world-map')) {
        // Force refresh the map data to ensure new locations are loaded
        if (window.pizzaMapData) {
            window.pizzaMapData.forceRefresh();
        }
        window.pizzaMap = new PizzaInteractiveMap('world-map');
        
        // Update stats display
        setTimeout(() => {
            const stats = window.pizzaMapData.getTotalStats();
            const totalLocationsEl = document.getElementById('total-locations');
            const totalPartnersEl = document.getElementById('total-partners');
            const totalMealsEl = document.getElementById('total-meals');
            
            // Keep the original 12 locations and 18 partners as shown in the UI
            if (totalLocationsEl) totalLocationsEl.textContent = '12';
            if (totalPartnersEl) totalPartnersEl.textContent = '18';
            if (totalMealsEl) {
                // Combine partner meals served + donated meals for total
                const combinedMeals = stats.totalMeals + stats.totalDonatedMeals;
                totalMealsEl.textContent = combinedMeals.toLocaleString();
            }
        }, 1000);
    }
}); 