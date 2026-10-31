const form = document.querySelector('#rsvp-form');
const status = document.querySelector('#rsvp-status');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = String(data.get('name')).trim();
  if (!name) { document.querySelector('#guest-name').focus(); return; }
  const response = { name, attending: data.get('attending'), count: data.get('count') };
  let saved = true;
  try { localStorage.setItem('mariana-vasco-demo-rsvp', JSON.stringify(response)); } catch { saved = false; }
  status.textContent = response.attending === 'yes'
    ? `${name}, estás na equipa! ♡ ${saved ? 'Resposta de brincadeira guardada só neste browser.' : 'Confirmação de brincadeira concluída.'} Nada foi enviado aos noivos.`
    : `${name}, recebemos o teu carinho! ♡ Isto é uma demonstração: nada foi enviado aos noivos.`;
});
document.querySelectorAll('input[name="attending"]').forEach(input => input.addEventListener('change', () => {
  const no = form.elements.attending.value === 'no';
  form.elements.count.disabled = no;
  form.elements.count.style.opacity = no ? '.45' : '1';
  status.textContent = '';
}));
