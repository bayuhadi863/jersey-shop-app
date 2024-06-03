import React from "react";
import Container from "@/Components/Home/Container";
import {
  Paper,
  Text,
  TextInput,
  Textarea,
  Button,
  Group,
  SimpleGrid,
} from "@mantine/core";
import { ContactIconsList } from "./ContactIcon";
import classes from "../../css/ContactInfo.module.css";

const ContactSection = () => {
  return (
    <div id="contact">
      <Container>
        <div className="mt-5 mx-2 lg:mx-20">
          <Paper shadow="md" radius="lg">
            <div className="flex flex-col lg:flex-row">
              <div className={classes.contacts}>
                <Text fz="lg" fw={700} className={classes.title} c="#fff">
                  Contact information
                </Text>

                <ContactIconsList />
              </div>

              <form
                className={classes.form}
                onSubmit={(event) => event.preventDefault()}
              >
                <Text fz="lg" fw={700} className={classes.title}>
                  Get in touch
                </Text>

                <div className={classes.fields}>
                  <SimpleGrid cols={{ base: 1, sm: 2 }}>
                    <TextInput label="Your name" placeholder="Your name" />
                    <TextInput
                      label="Your email"
                      placeholder="youremail@gmail.com"
                      required
                    />
                  </SimpleGrid>

                  <TextInput
                    mt="md"
                    label="Subject"
                    placeholder="Subject"
                    required
                  />

                  <Textarea
                    mt="md"
                    label="Your message"
                    placeholder="Please include all relevant information"
                    minRows={3}
                  />

                  <Group justify="flex-end" mt="md">
                    <Button type="submit" className={classes.control}>
                      Send message
                    </Button>
                  </Group>
                </div>
              </form>
            </div>
          </Paper>
        </div>
      </Container>
    </div>
  );
};

export default ContactSection;
