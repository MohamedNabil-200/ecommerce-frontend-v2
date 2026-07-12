import { Box, Container, Paper, Typography } from "@mui/material";

const HomePage = () => {
  return (
    <Container>
      <Box>
        <Typography variant="h3">Hero Section</Typography>
      </Box>
      <Box>
        <Paper sx={{p: 3}}>Featured Products Placeholder</Paper>
      </Box>
      <Box>
        <Paper sx={{p: 3}}>Categories Placeholder</Paper>
      </Box>
    </Container>
  );
};

export default HomePage;
