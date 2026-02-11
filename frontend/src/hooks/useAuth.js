import { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';

// Configure axios base URL
axios.defaults.baseURL = 'http://localhost:8000/api';

// Demo users for fallback
const demoUsers = [
    { email: 'john@agent.com', password: 'password123', name: 'John Doe', id: 1 },
    { email: 'sarah@agent.com', password: 'password123', name: 'Sarah Smith', id: 2 }
];

// Demo properties for different users
const demoProperties = {
    1: [ // John Doe's properties
        { id: 1, title: 'Beach House in Canacona', city: 'Canacona', state: 'Goa', price_per_night: 12000, min_nights: 2, property_type: 'beach_house', beds: 2, bedrooms: 1, bathrooms: 1, rating: 4.8, total_reviews: 127, is_guest_favorite: true, agent_id: 1, description: 'Beautiful beach house in Canacona with stunning ocean views', amenities: ['wifi', 'kitchen', 'parking', 'beach_access'], image: 'https://picsum.photos/400/300?random=1' },
        { id: 2, title: 'Luxury Villa in South Goa', city: 'South Goa', state: 'Goa', price_per_night: 15000, min_nights: 2, property_type: 'villa', beds: 3, bedrooms: 2, bathrooms: 2, rating: 4.9, total_reviews: 89, is_guest_favorite: true, agent_id: 1, description: 'Luxury villa with private pool and garden in South Goa', amenities: ['wifi', 'pool', 'kitchen', 'parking', 'garden'], image: 'https://picsum.photos/400/300?random=3' },
        { id: 3, title: 'Modern Apartment in Majorda', city: 'Majorda', state: 'Goa', price_per_night: 8000, min_nights: 1, property_type: 'apartment', beds: 2, bedrooms: 1, bathrooms: 1, rating: 4.7, total_reviews: 56, is_guest_favorite: false, agent_id: 1, description: 'Modern apartment with modern amenities in Majorda', amenities: ['wifi', 'kitchen', 'ac', 'parking'], image: 'https://picsum.photos/400/300?random=5' }
    ],
    2: [ // Sarah Smith's properties
        { id: 4, title: 'Heritage House in Old Goa', city: 'Old Goa', state: 'Goa', price_per_night: 10000, min_nights: 2, property_type: 'house', beds: 4, bedrooms: 2, bathrooms: 2, rating: 4.6, total_reviews: 203, is_guest_favorite: true, agent_id: 2, description: 'Heritage house with Portuguese architecture in Old Goa', amenities: ['wifi', 'kitchen', 'parking', 'heritage_view'], image: 'https://picsum.photos/400/300?random=7' },
        { id: 5, title: 'Beach Cottage in Palolem', city: 'Palolem', state: 'Goa', price_per_night: 6000, min_nights: 1, property_type: 'cottage', beds: 2, bedrooms: 1, bathrooms: 1, rating: 4.5, total_reviews: 78, is_guest_favorite: false, agent_id: 2, description: 'Cozy beach cottage near Palolem beach', amenities: ['wifi', 'kitchen', 'beach_access', 'parking'], image: 'https://picsum.photos/400/300?random=9' },
        { id: 6, title: 'Penthouse in Panjim', city: 'Panjim', state: 'Goa', price_per_night: 18000, min_nights: 3, property_type: 'penthouse', beds: 4, bedrooms: 3, bathrooms: 3, rating: 4.9, total_reviews: 45, is_guest_favorite: true, agent_id: 2, description: 'Luxury penthouse with city views in Panjim', amenities: ['wifi', 'pool', 'gym', 'parking', 'city_view'], image: 'https://picsum.photos/400/300?random=11' }
    ]
};

const AuthContext = createContext();

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userProperties, setUserProperties] = useState([]);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.get('/auth/user', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(response.data.agent);
                // Load user-specific properties
                loadUserProperties(response.data.agent.id);
            } catch (error) {
                console.error('Error fetching user data:', error);
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
    };

    const loadUserProperties = (userId) => {
        // In real app, this would fetch from API
        // For demo, use the demo properties
        const properties = demoProperties[userId] || [];
        setUserProperties(properties);
    };

    const login = async (email, password) => {
        try {
            // Try real API first
            const response = await axios.post('/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            setUser(response.data.agent);
            // Load user-specific properties
            loadUserProperties(response.data.agent.id);
            return { success: true, data: response.data };
        } catch (error) {
            console.error('Login error:', error);
            
            // Fallback to demo authentication if backend is not available
            if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
                const demoUser = demoUsers.find(u => u.email === email && u.password === password);
                if (demoUser) {
                    // Create a fake token for demo purposes
                    const fakeToken = 'demo-token-' + Date.now();
                    localStorage.setItem('token', fakeToken);
                    setUser(demoUser);
                    // Load user-specific properties
                    loadUserProperties(demoUser.id);
                    return { success: true, data: { agent: demoUser, token: fakeToken } };
                }
                return { success: false, error: 'Invalid email or password' };
            }
            
            // Handle other API errors
            const errorMessage = error.response?.data?.message || 
                              error.response?.data?.error || 
                              'Login failed. Please try again.';
            return { success: false, error: errorMessage };
        }
    };

    const logout = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await axios.post('/auth/logout', {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('token');
            setUser(null);
            setUserProperties([]);
        }
    };

    const updatePropertyPrice = async (propertyId, newPrice) => {
        try {
            // Try real API first
            const token = localStorage.getItem('token');
            await axios.post(`/agent/properties/${propertyId}/price`, 
                { price_per_night: newPrice },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            // Update local state
            setUserProperties(prev => 
                prev.map(prop => 
                    prop.id === propertyId ? { ...prop, price_per_night: newPrice } : prop
                )
            );
            return { success: true };
        } catch (error) {
            console.error('Error updating property price:', error);
            
            // Fallback to local update for demo
            if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
                setUserProperties(prev => 
                    prev.map(prop => 
                        prop.id === propertyId ? { ...prop, price_per_night: newPrice } : prop
                    )
                );
                return { success: true };
            }
            return { success: false, error: 'Failed to update price' };
        }
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            login, 
            logout, 
            loading, 
            userProperties,
            updatePropertyPrice
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export { useAuth };
export default AuthProvider;
