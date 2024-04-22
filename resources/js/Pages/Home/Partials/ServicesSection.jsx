import React from 'react'
import Container from '@/Components/Home/Container'
import SectionTitle from '@/Components/Home/SectionTitle'
import { IconArrowRight } from '@tabler/icons-react';
import { Card, Text, Group, Center, rem, useMantineTheme } from '@mantine/core';
import classes from '@/Pages/Home/css/ImageCard.module.css';

const ServicesSection = () => {
  const theme = useMantineTheme();

  return (
    <section className="py-10">
      <div>
        <Container>
          <SectionTitle>Layanan Kita</SectionTitle>
          <div className='grid lg:grid-cols-3 gap-6 mt-6'>
            <Card
              p="lg"
              shadow="lg"
              className={classes.card}
              radius="md"
              component="a"
              href="https://mantine.dev/"
              target="_blank"
            >
              <div
                className={classes.image}
                style={{
                  backgroundImage:
                    'url(/storage/hero_images/real-madrid.png)',
                }}
              />
              <div className={classes.overlay} />

              <div className={classes.content}>
                <div>
                  <Text size="lg" className={classes.title} fw={500}>
                    Product Lengkap
                  </Text>

                  <Group justify="space-between" gap="xs">
                    <Text size="sm" className={classes.author}>
                      Temukan produk lengkap disini
                    </Text>

                    <Group gap="lg">
                      <Center>
                        <IconArrowRight
                          style={{ width: rem(30), height: rem(30) }}
                          stroke={3}
                          color={theme.colors.dark[1]}
                        />
                      </Center>
                    </Group>
                  </Group>
                </div>
              </div>
            </Card>
            <Card
              p="lg"
              shadow="lg"
              className={classes.card}
              radius="md"
              component="a"
              href="https://mantine.dev/"
              target="_blank"
            >
              <div
                className={classes.image}
                style={{
                  backgroundImage:
                    'url(/storage/hero_images/manchester-united-1.png)',
                }}
              />
              <div className={classes.overlay} />

              <div className={classes.content}>
                <div>
                  <Text size="lg" className={classes.title} fw={500}>
                    Product Termurah
                  </Text>

                  <Group justify="space-between" gap="xs">
                    <Text size="sm" className={classes.author}>
                      Temukan produk termurah disini
                    </Text>

                    <Group gap="lg">
                      <Center>
                        <IconArrowRight
                          style={{ width: rem(30), height: rem(30) }}
                          stroke={3}
                          color={theme.colors.dark[1]}
                        />
                      </Center>
                    </Group>
                  </Group>
                </div>
              </div>
            </Card>
            <Card
              p="lg"
              shadow="lg"
              className={classes.card}
              radius="md"
              component="a"
              href="https://mantine.dev/"
              target="_blank"
            >
              <div
                className={classes.image}
                style={{
                  backgroundImage:
                    'url(/storage/service_images/LayananPengiriman.jpg)',
                }}
              />
              <div className={classes.overlay} />

              <div className={classes.content}>
                <div>
                  <Text size="lg" className={classes.title} fw={500}>
                    Layanan Pengiriman
                  </Text>

                  <Group justify="space-between" gap="xs">
                    <Text size="sm" className={classes.author}>
                      Tersedia banyak layanan pengiriman
                    </Text>

                    <Group gap="lg">
                      <Center>
                        <IconArrowRight
                          style={{ width: rem(30), height: rem(30) }}
                          stroke={3}
                          color={theme.colors.dark[1]}
                        />
                      </Center>
                    </Group>
                  </Group>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </div>
    </section>
  )
}

export default ServicesSection