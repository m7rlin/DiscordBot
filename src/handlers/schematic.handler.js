module.exports = (msg) => {
  const { content } = msg

  const a = content.split("\n")

  const imie = a[0]
  const wiek = a[1]
  const zainteresowania = a[2]

  // Validation
  if (
    !imie.startsWith("Imię:") ||
    !wiek.startsWith("Wiek:") ||
    !zainteresowania.startsWith("Zainteresowania:")
  )
    msg.delete()

  console.log(a)
}
/*
Imię: Marcin
Wiek: 20
Zainteresowania: Blondynka Sysia :hearts:
*/
