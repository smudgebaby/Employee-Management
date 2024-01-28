import PersonalDocument from "../Components/PersonalDocument";
import { Container, Typography, Grid } from '@mui/material';
const DocumentPage = () => {
    return(<>
    <Container maxWidth="md">
    <Typography variant="h4" gutterBottom>
        Personal Documents
    </Typography>
    <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={12}>
            <PersonalDocument documentId="65b58ff52815f1ebed74a80a" />
            
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
        <PersonalDocument documentId="65b5932a2815f1ebed74a830" />
        </Grid>
    </Grid>
    </Container>
    </>)
}

export default DocumentPage;