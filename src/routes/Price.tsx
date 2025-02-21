import styled from "styled-components";

interface PriceProps {
  quotes?: {
    USD: {
      price: number;
      volume_24h: number;
      market_cap: number;
      percent_change_24h: number;
      ath_price: number;
      percent_from_price_ath: number;
    };
  };
}

function Price({ quotes }: PriceProps) {
  if (!quotes) return <Loading>Loading...</Loading>;

  return (
    <Container>
      <Title>📈 Price Information</Title>
      <Table>
        <tbody>
          <Row>
            <Label>💰 Current Price</Label>
            <Value>${quotes.USD.price.toFixed(2)}</Value>
          </Row>
          <Row>
            <Label>📊 24h Volume</Label>
            <Value>${quotes.USD.volume_24h.toLocaleString()}</Value>
          </Row>
          <Row>
            <Label>🏛️ Market Cap</Label>
            <Value>${quotes.USD.market_cap.toLocaleString()}</Value>
          </Row>
          <Row>
            <Label>📉 24h Change</Label>
            <Value color={quotes.USD.percent_change_24h < 0 ? "red" : "green"}>
              {quotes.USD.percent_change_24h.toFixed(2)}%
            </Value>
          </Row>
          <Row>
            <Label>🚀 All-Time High</Label>
            <Value>${quotes.USD.ath_price.toFixed(2)}</Value>
          </Row>
          <Row>
            <Label>⬇️ Drop from ATH</Label>
            <Value color="red">
              {quotes.USD.percent_from_price_ath.toFixed(2)}%
            </Value>
          </Row>
        </tbody>
      </Table>
    </Container>
  );
}

export default Price;

// 🌟 Styled Components for better design
const Container = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 10px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Row = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const Label = styled.td`
  font-weight: bold;
  padding: 10px;
`;

const Value = styled.td<{ color?: string }>`
  text-align: right;
  padding: 10px;
  color: ${(props) => props.color || "black"};
`;

const Loading = styled.p`
  text-align: center;
  font-size: 18px;
  color: gray;
`;
