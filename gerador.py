import string
from random import choice, randint

class Gerador():
    def __init__(self):
        self.ascii_letters = string.ascii_letters
        
    def usuario(self, length, digits):
        return ''.join(choice(self.ascii_letters + string.digits if digits else self.ascii_letters) for _ in range(length))
        
    def senha(self, length, digits, upper, lower, punctuation):
        chars = ''
        if digits:
            chars += string.digits
        if upper:
            chars += string.ascii_uppercase
        if lower:
            chars += string.ascii_lowercase
        if punctuation:
            chars += string.punctuation
        return ''.join(choice(chars) for _ in range(length))

    def soma_mult_cpf(self, cpf):
        return sum(int(a) * b for a, b in zip(cpf, range(len(cpf)+1, 1, -1)))

    def digito_verificador(self, soma):
        return str(11 - (soma % 11)) if (11 - (soma % 11) < 10) else '0'

    def local_cpf(self, cpf):
        locais = {
            '1': 'DF, GO, MS, MT e TO', 
            '2': 'AC, AM, AP, PA, RO e RR', 
            '3': 'CE, MA e PI', 
            '4': 'AL, PB, PE, RN',
            '5': 'BA e SE',
            '6': 'MG',
            '7': 'ES e RJ',
            '8': 'SP',
            '9': 'PR e SC',
            '0': 'RS'
        }
        cpf_parsed = cpf.replace('.', '').replace('-', '')
        return locais.get(cpf_parsed[8])

    def gen_cpf(self):
        cpf = ''.join([str(randint(0, 9)) for i in range(9)])
        not_ok = cpf.count(cpf[0]) == len(cpf)
        if not_ok:
            return
        soma = self.soma_mult_cpf(cpf)
        primeiro_verificador = self.digito_verificador(soma)
        soma = self.soma_mult_cpf(cpf + primeiro_verificador)
        segundo_verificador = self.digito_verificador(soma)
        cpf = cpf + primeiro_verificador + segundo_verificador
        return cpf

    def valida_cpf(self, cpf):
        cpf_parsed = cpf.replace('.', '').replace('-', '')
        not_ok = cpf.count(cpf[0]) == len(cpf_parsed)
        if not_ok or len(cpf_parsed) != 11:
            return False
        cpf = cpf_parsed[:-2]
        soma = self.soma_mult_cpf(cpf)
        primeiro_verificador = self.digito_verificador(soma)
        if primeiro_verificador != cpf_parsed[-2]:
            return False
        soma = self.soma_mult_cpf(cpf + primeiro_verificador)
        segundo_verificador = self.digito_verificador(soma)
        if segundo_verificador != cpf_parsed[-1]:
            return False
        return True

def main():
    gerador = Generator()
    # cpf = gerador.gen_cpf()
    cpf = '850.682.692-63'
    print(gerador.valida_cpf(cpf))
    print(gerador.local_cpf(cpf))

    
if __name__ == "__main__":
    main()