import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface Props {
  name: string;
  career: {
    name: string;
    color: string;
  };
  code: string;
}

const VerificationCodeEmail: React.FC<Props> = ({ name, career, code }) => {
  return (
    <Html>
      <Head />
      <Preview>codigo de verificacion</Preview>
      <Body style={main}>
        <Container>
          <Section style={logo}>
            <Img
              width={130}
              src="https://raw.githubusercontent.com/cesar-brandon/job-platform/02645347daa88442ec177baad50076ad29243cc0/public/logo/logo-ifv.png"
            />
          </Section>

          <Tailwind>
            <Section className="rounded-xl overflow-hidden border-solid border-[1px] border-gray-200 shadow-2xl">
              <Row width={620} className={`p-8 rounded-xl ${career.color}`}>
                <Column>
                  <Heading className="font-bold text-2xl text-white">
                    👋🏻 Hola {name}
                  </Heading>
                  <Heading className="font-normal text-lg text-white">
                    de {career.name}
                  </Heading>
                </Column>
              </Row>
              <Row className="p-8">
                <Heading className="font-semibold text-lg text-black">
                  Codigo de verificacion
                </Heading>
                <Text className="font-light texxt-md text-black">
                  Por favor ingresa el siguiente codigo para continuar con el
                  proceso de registro
                </Text>

                <Section className="rounded-xl bg-gray-200">
                  <Text className="font-bold text-xl text-center align-middle">
                    {code}
                  </Text>
                </Section>
              </Row>
            </Section>
            <Text
              style={{
                textAlign: "center",
                fontSize: 12,
                color: "rgb(0,0,0, 0.7)",
              }}
            >
              © 2023 | Instituto Federico Villarreal
            </Text>
          </Tailwind>
        </Container>
      </Body>
    </Html>
  );
};

export default VerificationCodeEmail;

const main = {
  backgroundColor: "#fff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const logo = {
  padding: "30px 20px",
};
