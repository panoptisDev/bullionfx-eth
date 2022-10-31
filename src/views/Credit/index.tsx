import styled from 'styled-components'
import Container from "components/Layout/Container"

const StyledIframe = styled.iframe`
    width: 100%;
    height: 900px;
    @media (max-width: 1024px) {
        height: 870px;
    }
    @media (max-width: 768px) {
        height: 700px;
    }
    margin-top: 60px;
    margin-bottom: 10px;
`

export default function Credit() {
    return (
        <Container>
                <StyledIframe src="https://app.kado.money?apiKey=API_KEY&amp;onPayCurrency=USD&amp;onRevCurrency=USDC&amp;offPayCurrency=USDC&amp;offRevCurrency=USD&amp;onPayAmount=20&amp;offPayAmount=20&amp;onToAddress=0x76358Ef594d630bB8eFeBfa2Fb03E97B72Be58f4&amp;cryptoList=ETH&amp;fiatList=AUD&amp;network=ETHEREUM&amp;product=BUY" title="credit" />
        </Container>
    )
}