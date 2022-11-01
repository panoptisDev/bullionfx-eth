import styled from 'styled-components'
import Container from "components/Layout/Container"

const StyledIframe = styled.iframe`
    width: 500px;
    height: 700px;
    margin: 115px auto 65px;
    @media (max-width: 768px) {
        margin-top: 80px;
        margin-bottom: 30px;
    }
`

export default function Credit() {
    return (
        <Container style={{display: "flex"}}>
                <StyledIframe src="https://app.kado.money?apiKey=API_KEY&amp;onPayCurrency=USD&amp;onRevCurrency=USDC&amp;offPayCurrency=USDC&amp;offRevCurrency=USD&amp;onPayAmount=20&amp;offPayAmount=20&amp;cryptoList=ETH&amp;fiatList=AUD&amp;network=ETHEREUM&amp;product=BUY" title="credit" />
        </Container>
    )
}