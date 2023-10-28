Esse projeto tem como objetivo facilitar a manipulação de eventos de webhooks muito comuns em meios de pagamentos

<b>WebhookController</b>

- Esse arquivo é a porta de entrada de todos os eventos do webhook, importante frisar que se for trabalhar mais de um meio de pagamento, é necessário criar um outro controller. Divida os controllers por contextos/responsabilidades.

<b>WEBHOOK_EVENTS</b>

- Esse arquivo é onde você irá mapear todos os eventos que irá usar de um determinado provider, exemplo: PAGARME_WEBHOOK_EVENTS, ASAAS_WEBHOOK_EVENTS, PAGSEGURO_WEBHOOK_EVENTS

<b>WebhookHandler</b>

- A classe abstrata desse arquivo deverá ser implementada por todas as futuras classes que manipularão os eventos de webhooks (PS: sinta-se à vontade para trocar o nome), exemplo:

```
export class PagarmeWebhookPaymentConfirmed implements WebhookHandler { // code here }
export class PagseguroWebhookPaymentConfirmed implements WebhookHandler { // code here }
export class AsaasPagseguroWebhookPaymentConfirmed implements WebhookHandler { // code here }
```

<b>WebhookOrigin</b>

- Essa classe que irá mapear os eventos de webhooks e chamar a classe correta para manipular algum evento

<b>WebhookPayload</b>

- Essa classe acabei deixando de bônus, caso você trabalhe com um meio de pagamento que padronize a estrutura dos dados você pode utilizá-la sem problemas, exemplo de um objeto padronizado:

```
{
  "event": "PAYMENT_CONFIRMED",
  "payload": { // props of event here }
}
```

Exemplo de um objeto não padronizado

```
{
  "event": "PAYMENT_CONFIRMED",
  "payment": { // props of event here }
}

{
  "event": "INVOICE_CREATED",
  "invoice": { // props of event here }
}

```

Dessa forma fica mais complexo ter um objeto padronizado e usar essa classe, mas fique à vontade para desenvolver e abrir um PR. <3

<b>Webhook</b>

- Esse arquivo é a espinha dorsal pra fazer a "mágica" de receber os eventos, mapear e chamar a classe responsável por lidar com o evento.
- Aqui basicamente lidamos com o construtor das classes de manipulação de eventos e criamos um decorator chamado <b>@Webhook(EVENT_NAME)</b> onde você irá colocar o nome do evento que a classe vai trabalhar em cima.
- Também construimos um array em memória contendo o seguinte par de informações: o nome do evento e o construtor da classe.
- Como eventos são processos assíncronos, no controller nós recebemos toda a informação do evento e cabe a você mapear exatamente o que precisa usar, já executamos todos de uma vez e cada um fazendo o que precisa fazer.
- No controller também já é feito o mapeamento de localizar a classe handler que vai executar o evento e já faz o `dispatch` dessa classe.

<br /><br />
<b>IMPORTANTE</b>

- Importante dizer que essa estrutura pode ser usada em projetos feito do zero (from scratch) ou também ser colocado dentro de um projeto feito com Nest.
- A pasta `dependency-injection` é a injeção de dependência desse projeto mas pode ser adaptado pra usar em qualquer lugar e, obviamente, precisa ser adaptado no restante do projeto também.