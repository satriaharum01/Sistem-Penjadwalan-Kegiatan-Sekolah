import { useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Rating
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './style.css'; // Import style.css dari template lama

function App() {
  useEffect(() => {
    // Simulasi WOW.js, OwlCarousel, dsb jika diperlukan
  }, []);

  return (
    <>
      {/* Topbar */}
      <Box className="topbar-section">
        <Container>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="body2">
                📍 Find A Location | ☎ +01234567890 | ✉ Example@gmail.com
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                🔑 Register | 🔓 Login | 🏠 My Dashboard
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Navbar */}
      <AppBar position="static" color="default" className="navbar-section">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            💰 Stocker
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit">About</Button>
          <Button color="inherit">Services</Button>
          <Button color="inherit">Blogs</Button>
          <Button color="inherit">Contact</Button>
          <Button variant="contained" sx={{ ml: 2 }}>
            Get Started
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box className="hero-section">
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom color="primary">
                Welcome To Stocker
              </Typography>
              <Typography variant="h2" gutterBottom>
                Invest your money with higher return
              </Typography>
              <Typography variant="body1" paragraph>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </Typography>
              <Box>
                <Button variant="outlined" color="inherit" sx={{ mr: 2 }}>
                  ▶ Watch Video
                </Button>
                <Button variant="contained">Learn More</Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <img src="/img/carousel-1.jpg" alt="Hero" width="100%" className="hero-image" />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* About Section */}
      <Box className="about-section">
        <Container>
          <Typography variant="h4" color="primary" gutterBottom>
            About Us
          </Typography>
          <Typography variant="h3" gutterBottom>
            Meet our company unless miss the opportunity
          </Typography>
          <Typography paragraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit...
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box display="flex" mb={2}>
                <Typography variant="h6">💡 Business Consulting</Typography>
              </Box>
              <Box display="flex" mb={2}>
                <Typography variant="h6">❤️ Years of Expertise</Typography>
              </Box>
              <Button variant="contained" sx={{ mt: 2 }}>
                Discover Now
              </Button>
              <Box display="flex" alignItems="center" mt={4}>
                <Typography variant="h6" mr={2}>📞 Call Us</Typography>
                <Typography variant="body1">+01234567890</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <img src="/img/about-2.png" alt="About" width="100%" className="about-image" />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Services Section */}
      <Box className="services-section">
        <Container>
          <Typography variant="h4" color="primary" textAlign="center" gutterBottom>
            Our Services
          </Typography>
          <Typography variant="h3" textAlign="center" gutterBottom>
            We Services provided best offer
          </Typography>
          <Typography paragraph textAlign="center">
            Lorem ipsum dolor sit amet consectetur...
          </Typography>
          <Grid container spacing={4} mt={4}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Card>
                  <CardMedia
                    component="img"
                    height="160"
                    image={`/img/service-${i}.jpg`}
                    alt={`Service ${i}`}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Service Title {i}
                    </Typography>
                    <Typography variant="body2">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </Typography>
                    <Button variant="contained" sx={{ mt: 2 }}>
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box className="faq-section">
        <Container>
          <Typography variant="h4" color="primary" textAlign="center" gutterBottom>
            FAQs
          </Typography>
          <Typography variant="h3" textAlign="center" gutterBottom>
            Frequently Asked Questions
          </Typography>
          <Typography paragraph textAlign="center">
            Lorem ipsum dolor sit amet consectetur...
          </Typography>
          <Grid container spacing={4} mt={4}>
            <Grid item xs={12} md={6}>
              {[...Array(6)].map((_, idx) => (
                <Accordion key={idx}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>FAQ Question {idx + 1}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Placeholder content for this accordion. This is the answer to the FAQ.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Grid>
            <Grid item xs={12} md={6}>
              <img src="/img/about-2.png" alt="FAQ" width="100%" className="faq-image" />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box className="testimonial-section">
        <Container>
          <Typography variant="h4" color="primary" textAlign="center" gutterBottom>
            Testimonial
          </Typography>
          <Typography variant="h3" textAlign="center" gutterBottom>
            Our Clients Reviews
          </Typography>
          <Typography paragraph textAlign="center">
            Lorem ipsum dolor sit amet consectetur...
          </Typography>
          <Grid container spacing={4} mt={4} justifyContent="center">
            {[1, 2, 3].map((i) => (
              <Grid item xs={12} md={4} key={i}>
                <Card className="testimonial-card">
                  <Typography variant="body1" mb={2}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit...
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Avatar src={`/img/testimonial-${i}.jpg`} />
                    <Box ml={2}>
                      <Typography variant="subtitle1">Person Name {i}</Typography>
                      <Typography variant="caption">Profession</Typography>
                      <Rating value={5} readOnly size="small" />
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box className="footer-section">
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Stocker</Typography>
              <Typography>
                Dolor amet sit justo amet elitr clita ipsum elitr est.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Quick Links</Typography>
              <Typography>About Us</Typography>
              <Typography>Blog</Typography>
              <Typography>Contact</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Contact</Typography>
              <Typography>📍 123 Street, New York</Typography>
              <Typography>📧 info@example.com</Typography>
              <Typography>☎ (+012) 3456 7890</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default App;
