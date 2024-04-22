import React from 'react'
import Container from '@/Components/Home/Container'
import SectionTitle from '@/Components/Home/SectionTitle'
import { Text, Image } from '@mantine/core';

const AboutSection = () => {
  return (
    <div>
      <Container>
        <div>
          <SectionTitle>Tentang Kami</SectionTitle>
        </div>
        <div className='mt-5'>
          <Image
            radius="md"
            h={200}
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-10.png"
          />
          <div className='text-center mt-5'>
            <Text className=''>
              Sambutlah pengalaman berbelanja kaos jersey yang tak tertandingi di MyJersey, destinasi utama untuk semua kebutuhan jersey olahraga Anda. Kami menawarkan beragam pilihan kaos jersey berkualitas tinggi untuk memenuhi kebutuhan penggemar olahraga sejati. Di MyJersey, kami mengerti betapa pentingnya setiap detail dalam menciptakan pengalaman yang memuaskan bagi penggemar olahraga. Dari kaos jersey tim favorit Anda hingga koleksi unik yang sulit ditemukan di tempat lain, kami menawarkan berbagai macam desain, ukuran, dan varian untuk memenuhi selera dan kebutuhan Anda.Kami berkomitmen untuk memberikan pelayanan terbaik kepada pelanggan kami. Dengan layanan pelanggan yang responsif dan pengalaman berbelanja yang mulus, MyJersey memberikan kemudahan dan kepuasan maksimal kepada setiap pelanggan. Temukan kaos jersey yang sesuai dengan gaya dan preferensi Anda hanya di MyJersey. Dapatkan koleksi terbaik dan jadilah bagian dari penggemar olahraga yang bergaya dan bersemangat.
            </Text>
          </div>
        </div>

      </Container>
    </div>
  )
}

export default AboutSection