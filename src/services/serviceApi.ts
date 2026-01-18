export interface ServiceItem {
    id?: number;
    title: string;
    type: 'carpet' | 'shawl';
    image?: string;
    link_to: string;
    description?: string;
    created_at?: string;
}

const API_BASE = "https://hotpink-tapir-344575.hostingersite.com";

export const serviceApi = {
    // Fetch all services or filter by type
    getAll: async (type?: string): Promise<ServiceItem[]> => {
        try {
            const url = type ? `${API_BASE}/services?type=${type}` : `${API_BASE}/services`;
            const response = await fetch(url);
            const data = await response.json();
            return data.status === 'success' && Array.isArray(data.data) ? data.data : [];
        } catch (error) {
            console.error("Error fetching services:", error);
            return [];
        }
    },

    // Create a new service
    create: async (formData: FormData): Promise<any> => {
        try {
            const response = await fetch(`${API_BASE}/services/create`, {
                method: 'POST',
                body: formData, // FormData automatically sets the correct Content-Type with boundary
            });
            return await response.json();
        } catch (error) {
            console.error("Error creating service:", error);
            throw error;
        }
    },

    // Update an existing service
    update: async (id: number, formData: FormData): Promise<any> => {
        try {
            const response = await fetch(`${API_BASE}/services/update/${id}`, {
                method: 'POST', // Using POST for file uploads in CI3 usually works best this way
                body: formData,
            });
            return await response.json();
        } catch (error) {
            console.error("Error updating service:", error);
            throw error;
        }
    },

    // Delete a service
    delete: async (id: number): Promise<any> => {
        try {
            const response = await fetch(`${API_BASE}/services/delete/${id}`, {
                method: 'DELETE', // Or POST if your server prefers it
            });
            return await response.json();
        } catch (error) {
            console.error("Error deleting service:", error);
            throw error;
        }
    }
};
