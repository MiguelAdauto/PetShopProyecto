from num2words import num2words

def numero_a_letras(numero):
    """
    Convierte un número a letras en español.
    """
    return num2words(numero, lang='es').capitalize()
