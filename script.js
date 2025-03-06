document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const soilForm = document.getElementById('soilForm');
    const analyzeButton = document.getElementById('analyzeButton');
    const loader = document.getElementById('loader');
    const initialMessage = document.getElementById('initialMessage');
    const resultCard = document.getElementById('resultCard');
    const noHistoryMessage = document.getElementById('noHistoryMessage');
    const historyTable = document.getElementById('historyTable');
    
    // Form inputs
    const soilTypeInput = document.getElementById('soilType');
    const waterContentInput = document.getElementById('waterContent');
    const pHInput = document.getElementById('pH');
    const organicMatterInput = document.getElementById('organicMatter');
    
    // Error messages
    const soilTypeError = document.getElementById('soilTypeError');
    const waterContentError = document.getElementById('waterContentError');
    const pHError = document.getElementById('pHError');
    const organicMatterError = document.getElementById('organicMatterError');
    
    // Result elements
    const resultSoilType = document.getElementById('resultSoilType');
    const resultWaterContent = document.getElementById('resultWaterContent');
    const resultPH = document.getElementById('resultPH');
    const resultOrganicMatter = document.getElementById('resultOrganicMatter');
    const resultRecommendation = document.getElementById('resultRecommendation');
    const historyTableBody = document.getElementById('historyTableBody');
    
    // Soil recommendation database (simulated)
    const soilRecommendations = {
        'black': {
            low_water: {
                low_ph: "Add compost and increase watering. Black soil with low pH and low water content needs organic matter to improve water retention and raise pH.",
                medium_ph: "Increase watering frequency. Your black soil has good pH but needs more moisture for optimal performance.",
                high_ph: "Add sulfur to reduce pH and increase watering. Black soil with high pH and low water content needs pH correction and more water."
            },
            medium_water: {
                low_ph: "Add limestone to raise pH. Your black soil has good water content but needs pH adjustment for better nutrient availability.",
                medium_ph: "Your black soil is in optimal condition! Maintain current practices for water and pH balance.",
                high_ph: "Add sulfur or peat moss to lower pH. Your black soil has good water content but pH is too high."
            },
            high_water: {
                low_ph: "Improve drainage and add limestone. Black soil with excess water and low pH needs better drainage and pH correction.",
                medium_ph: "Improve drainage systems. Your black soil has good pH but water content is too high which may lead to waterlogging.",
                high_ph: "Improve drainage and add sulfur. Black soil with high water content and high pH needs drainage improvement and pH correction."
            }
        },
        'red': {
            low_water: {
                low_ph: "Add compost, limestone, and increase watering. Red soil with low pH and low water content needs organic matter and pH correction.",
                medium_ph: "Add organic matter and increase watering. Red soil needs help with water retention while maintaining good pH.",
                high_ph: "Add organic matter, sulfur, and increase watering. Red soil with high pH and low water content needs complete amendment."
            },
            medium_water: {
                low_ph: "Add limestone to raise pH. Your red soil has adequate water content but needs pH correction for better nutrient availability.",
                medium_ph: "Your red soil is in good condition. Consider adding some organic matter to further improve its structure.",
                high_ph: "Add sulfur to lower pH. Your red soil has good water content but pH needs to be reduced."
            },
            high_water: {
                low_ph: "Improve drainage and add limestone. Red soil with excess water and low pH needs drainage solutions and pH correction.",
                medium_ph: "Improve drainage systems. Your red soil has good pH but water content is too high.",
                high_ph: "Improve drainage and add sulfur. Red soil with high water content and high pH needs significant amendment."
            }
        },
        'sandy': {
            low_water: {
                low_ph: "Add compost, limestone, and implement regular watering. Sandy soil with low pH needs complete amendment.",
                medium_ph: "Add organic matter and implement regular watering. Sandy soil has poor water retention and needs organic amendment.",
                high_ph: "Add compost, sulfur, and implement regular watering. Sandy soil with high pH needs complete amendment."
            },
            medium_water: {
                low_ph: "Add compost and limestone. Sandy soil needs pH correction and organic matter to improve structure.",
                medium_ph: "Add compost to improve soil structure. Your sandy soil has good pH and water content but would benefit from organic matter.",
                high_ph: "Add compost and sulfur. Sandy soil with high pH needs organic matter and pH correction."
            },
            high_water: {
                low_ph: "Improve drainage, add compost and limestone. Sandy soil with excess water is unusual and needs structure improvement.",
                medium_ph: "Improve drainage and add organic matter. Sandy soil rarely has excess water, check for drainage problems.",
                high_ph: "Improve drainage, add compost and sulfur. Sandy soil with high water and pH needs comprehensive amendment."
            }
        },
        'clay': {
            low_water: {
                low_ph: "Add sand, limestone, and increase watering. Clay soil with low pH and water needs structural amendment.",
                medium_ph: "Add sand and increase watering. Clay soil needs structural improvement to prevent hardening when dry.",
                high_ph: "Add sand, sulfur, and increase watering. Clay soil with high pH needs complete amendment."
            },
            medium_water: {
                low_ph: "Add limestone and gypsum. Clay soil with low pH needs amendment for better nutrient availability.",
                medium_ph: "Add gypsum to improve structure. Your clay soil has good pH and water content but would benefit from better structure.",
                high_ph: "Add sulfur and gypsum. Clay soil with high pH needs correction for better nutrient availability."
            },
            high_water: {
                low_ph: "Improve drainage, add sand and limestone. Clay soil with excess water needs significant amendment.",
                medium_ph: "Improve drainage and add sand. Clay soil often has drainage problems that need to be addressed.",
                high_ph: "Improve drainage, add sand and sulfur. Clay soil with high water and pH needs comprehensive amendment."
            }
        },
        'loamy': {
            low_water: {
                low_ph: "Increase watering and add limestone. Loamy soil with low pH needs water and pH correction.",
                medium_ph: "Increase watering frequency. Loamy soil has good structure but needs consistent moisture.",
                high_ph: "Increase watering and add sulfur. Loamy soil with high pH needs water and pH correction."
            },
            medium_water: {
                low_ph: "Add limestone to raise pH. Your loamy soil has good water content but needs pH correction.",
                medium_ph: "Your loamy soil is in optimal condition! This is considered ideal soil for most plants.",
                high_ph: "Add sulfur to lower pH. Your loamy soil has good water content but pH is too high."
            },
            high_water: {
                low_ph: "Improve drainage and add limestone. Loamy soil with excess water needs drainage improvement.",
                medium_ph: "Improve drainage systems. Your loamy soil has good pH but water content is too high.",
                high_ph: "Improve drainage and add sulfur. Loamy soil with high water and pH needs amendment."
            }
        },
        'silt': {
            low_water: {
                low_ph: "Add compost, limestone, and increase watering. Silt soil with low pH needs complete amendment.",
                medium_ph: "Add organic matter and increase watering. Silt soil needs help with water management.",
                high_ph: "Add compost, sulfur, and increase watering. Silt soil with high pH needs complete amendment."
            },
            medium_water: {
                low_ph: "Add limestone to raise pH. Your silt soil has good water content but needs pH adjustment.",
                medium_ph: "Your silt soil is in good condition. Consider adding some organic matter periodically.",
                high_ph: "Add sulfur to lower pH. Your silt soil has good water content but pH needs to be reduced."
            },
            high_water: {
                low_ph: "Improve drainage and add limestone. Silt soil with excess water needs drainage solutions.",
                medium_ph: "Improve drainage systems. Your silt soil has good pH but water content is too high.",
                high_ph: "Improve drainage and add sulfur. Silt soil with high water and pH needs amendment."
            }
        }
    };
    
    // Load history from local storage (simulating database)
    loadHistory();
    
    // Form submission event
    soilForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error messages
        resetErrorMessages();
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Show loader and hide initial message
        loader.style.display = 'block';
        initialMessage.style.display = 'none';
        resultCard.style.display = 'none';
        
        // Simulate server request
        setTimeout(function() {
            analyzeAndDisplayResult();
        }, 1500);
    });
    
    // Reset error messages
    function resetErrorMessages() {
        soilTypeError.style.display = 'none';
        waterContentError.style.display = 'none';
        pHError.style.display = 'none';
        organicMatterError.style.display = 'none';
    }
    
    // Validate form
    function validateForm() {
        let isValid = true;
        
        if (soilTypeInput.value === '') {
            soilTypeError.style.display = 'block';
            isValid = false;
        }
        
        const waterContent = parseFloat(waterContentInput.value);
        if (isNaN(waterContent) || waterContent < 0 || waterContent > 100) {
            waterContentError.style.display = 'block';
            isValid = false;
        }
        
        const pH = parseFloat(pHInput.value);
        if (isNaN(pH) || pH < 0 || pH > 14) {
            pHError.style.display = 'block';
            isValid = false;
        }
        
        const organicMatter = parseFloat(organicMatterInput.value);
        if (isNaN(organicMatter) || organicMatter < 0 || organicMatter > 100) {
            organicMatterError.style.display = 'block';
            isValid = false;
        }
        
        return isValid;
    }
    
    // Analyze soil and display result
    function analyzeAndDisplayResult() {
        // Get form values
        const soilType = soilTypeInput.value;
        const waterContent = parseFloat(waterContentInput.value);
        const pH = parseFloat(pHInput.value);
        const organicMatter = parseFloat(organicMatterInput.value);
        
        // Determine water content category
        let waterCategory;
        if (waterContent < 30) {
            waterCategory = 'low_water';
        } else if (waterContent < 60) {
            waterCategory = 'medium_water';
        } else {
            waterCategory = 'high_water';
        }
        
        // Determine pH category
        let pHCategory;
        if (pH < 6) {
            pHCategory = 'low_ph';
        } else if (pH < 8) {
            pHCategory = 'medium_ph';
        } else {
            pHCategory = 'high_ph';
        }
        
        // Get recommendation
        const recommendation = soilRecommendations[soilType][waterCategory][pHCategory];
        
        // Display result
        resultSoilType.textContent = getSoilTypeName(soilType);
        resultWaterContent.textContent = waterContent.toFixed(1);
        resultPH.textContent = pH.toFixed(1);
        resultOrganicMatter.textContent = organicMatter.toFixed(1);
        resultRecommendation.textContent = recommendation;
        
        // Show result card and hide loader
        loader.style.display = 'none';
        resultCard.style.display = 'block';
        
        // Save to history
        saveToHistory(soilType, waterContent, pH, organicMatter, recommendation);
    }
    
    // Get full soil type name
    function getSoilTypeName(soilType) {
        const soilTypes = {
            'black': 'Black Soil',
            'red': 'Red Soil',
            'sandy': 'Sandy Soil',
            'clay': 'Clay Soil',
            'loamy': 'Loamy Soil',
            'silt': 'Silt Soil'
        };
        
        return soilTypes[soilType] || soilType;
    }
    
    // Save analysis to history
    function saveToHistory(soilType, waterContent, pH, organicMatter, recommendation) {
        // Get existing history or initialize empty array
        let history = JSON.parse(localStorage.getItem('soilAnalysisHistory')) || [];
        
        // Add new analysis
        history.push({
            date: new Date().toLocaleString(),
            soilType: getSoilTypeName(soilType),
            waterContent: waterContent.toFixed(1),
            pH: pH.toFixed(1),
            organicMatter: organicMatter.toFixed(1),
            recommendation: recommendation
        });
        
        // Save to local storage (simulating database)
        localStorage.setItem('soilAnalysisHistory', JSON.stringify(history));
        
        // Update history display
        loadHistory();
    }
    
    // Load and display history
    function loadHistory() {
        // Get history from local storage
        const history = JSON.parse(localStorage.getItem('soilAnalysisHistory')) || [];
        
        // Clear history table
        historyTableBody.innerHTML = '';
        
        // Check if history exists
        if (history.length === 0) {
            noHistoryMessage.style.display = 'block';
            historyTable.classList.add('hidden');
            return;
        }
        
        // Show history table and hide no history message
        noHistoryMessage.style.display = 'none';
        historyTable.classList.remove('hidden');
        
        // Add history items to table
        history.forEach(function(item) {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${item.date}</td>
                <td>${item.soilType}</td>
                <td>${item.waterContent}%</td>
                <td>${item.pH}</td>
                <td>${item.organicMatter}%</td>
                <td>${item.recommendation}</td>
            `;
            
            historyTableBody.appendChild(row);
        });
    }
    
    // Note: In a real application, you would send AJAX requests to a server
    // that would interact with a MySQL database instead of using localStorage
});