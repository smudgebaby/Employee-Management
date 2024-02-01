import axios from 'axios';
const fetchDocumentData = async (documentId) => {
    try {
      const documentUrl = `http://localhost:3000/documents/${documentId}`;  
      const response = await axios.get(documentUrl, {
        withCredentials: true
      });
      if (response.data) {
        
        const fileType = response.data.fileURL.split('.').pop();
        // console.log('***', fileType);
        return({
          url: response.data.fileURL,
          type: response.data.type,
          status: response.data.status,
          fileType: fileType
        });
      }
      else{
        return false;
      };
    } catch (error) {
      console.error('Failed to fetch document data:', error);
    }
  };

export default fetchDocumentData;