/* Grafo de posições: fonte única de "de onde sai cada técnica e onde ela termina" (lido também por tools/build.py,
   que falha se uma técnica do catálogo ficar fora do grafo ou se uma aresta citar posição/técnica inexistente).
   Posição: uma situação da dupla, com o nome de cada lado. Aresta: o que QUEM EXECUTA faz,
   de [posição, lado dele] para [posição, lado dele depois]. tec:null = transição ainda sem animação. */
window.JUDO_GRAFO = {
 "posicoes": [
  {"id": "em-pe", "nome": "Em pé", "lados": {"pe": "Em pé, com pegada"}},
  {"id": "guarda-fechada", "nome": "Guarda fechada", "lados": {"baixo": "Na guarda fechada, por baixo", "cima": "Dentro da guarda fechada"}},
  {"id": "guarda-aberta", "nome": "Guarda aberta", "lados": {"baixo": "Na guarda aberta, por baixo", "cima": "Passando a guarda aberta"}},
  {"id": "borboleta", "nome": "Guarda borboleta", "lados": {"baixo": "Na borboleta, sentado", "cima": "Dentro da borboleta"}},
  {"id": "meia-guarda", "nome": "Meia-guarda", "lados": {"baixo": "Na meia-guarda, por baixo", "cima": "Na meia-guarda, por cima"}},
  {"id": "controle-lateral", "nome": "Controle lateral (100 quilos)", "tec": "yoko-shiho-gatame", "lados": {"cima": "No 100 quilos, por cima", "baixo": "Embaixo do 100 quilos"}},
  {"id": "kesa", "nome": "Kesa-gatame", "tec": "kesa-gatame", "lados": {"cima": "No kesa-gatame, por cima", "baixo": "Preso no kesa-gatame"}},
  {"id": "norte-sul", "nome": "Norte-sul", "tec": "kami-shiho-gatame", "lados": {"cima": "No norte-sul, por cima", "baixo": "Preso no norte-sul"}},
  {"id": "joelho-na-barriga", "nome": "Joelho na barriga", "lados": {"cima": "Com o joelho na barriga", "baixo": "Com um joelho na barriga"}},
  {"id": "montada", "nome": "Montada", "tec": "tate-shiho-gatame", "lados": {"cima": "Montado", "baixo": "Embaixo da montada"}},
  {"id": "costas", "nome": "Costas", "lados": {"cima": "Nas costas, com ganchos", "baixo": "Com alguém nas costas"}},
  {"id": "tartaruga", "nome": "Tartaruga", "lados": {"cima": "Por cima da tartaruga", "baixo": "Na tartaruga"}},
  {"id": "finalizado", "nome": "Finalização", "terminal": true, "lados": {"fim": "Uke bateu"}}
 ],
 "arestas": [
  {"tec": "ippon-seoi-nage", "tipo": "projecao", "de": ["em-pe", "pe"], "para": ["norte-sul", "cima"], "gatilho": "Uke puxado para a frente, para o canto direito"},
  {"tec": "o-soto-gari", "tipo": "projecao", "de": ["em-pe", "pe"], "para": ["controle-lateral", "cima"], "gatilho": "Uke com o peso para trás, sobre o calcanhar direito", "nota": "Tori termina em pé e desce para o 100 quilos."},
  {"tec": "o-uchi-gari", "tipo": "projecao", "de": ["em-pe", "pe"], "para": ["guarda-aberta", "cima"], "gatilho": "Uke com os pés afastados e o peso para trás", "nota": "Tori termina de pé entre as pernas de Uke: ainda tem a guarda para passar."},
  {"tec": "o-goshi", "tipo": "projecao", "de": ["em-pe", "pe"], "para": ["kesa", "cima"], "gatilho": "Uke vem para a frente, com o quadril perto"},
  {"tec": "harai-goshi", "tipo": "projecao", "de": ["em-pe", "pe"], "para": ["controle-lateral", "cima"], "gatilho": "Uke quebrado para a frente, apoiado na ponta do pé", "nota": "Tori termina em pé e desce para o 100 quilos."},
  {"tec": "tai-otoshi", "tipo": "projecao", "de": ["em-pe", "pe"], "para": ["controle-lateral", "cima"], "gatilho": "Uke puxado para a frente e para a direita, sobre a ponta do pé", "nota": "Tori termina em pé e desce para o 100 quilos."},
  {"tec": "uchi-mata", "tipo": "projecao", "de": ["em-pe", "pe"], "para": ["kesa", "cima"], "gatilho": "Uke com os pés afastados, puxado para a frente"},
  {"tec": "de-ashi-barai", "tipo": "projecao", "de": ["em-pe", "pe"], "para": ["joelho-na-barriga", "cima"], "gatilho": "Uke dá um passo e ainda não pôs o peso no pé"},
  {"tec": "tomoe-nage", "tipo": "projecao", "de": ["em-pe", "pe"], "para": ["montada", "cima"], "gatilho": "Uke empurra para a frente, com o tronco curvado", "nota": "Tori rola por cima atrás de Uke para chegar à montada."},
  {"tec": "morote-gari", "tipo": "projecao", "de": ["em-pe", "pe"], "para": ["guarda-aberta", "cima"], "gatilho": "Uke ereto, sem pegada fixa", "nota": "Tori termina com as pernas de Uke no peito: ainda tem a guarda para passar."},
  {"tec": "ko-uchi-gari", "tipo": "projecao", "de": ["em-pe", "pe"], "para": ["guarda-aberta", "cima"], "gatilho": "Uke com o peso no calcanhar da frente", "nota": "Tori pisa entre as pernas de Uke: ainda tem a guarda para passar."},
  {"tec": "sumi-gaeshi", "tipo": "projecao", "de": ["em-pe", "pe"], "para": ["montada", "cima"], "gatilho": "Uke curvado, com o peso para a frente", "nota": "Tori termina deitado e rola por cima para a montada."},
  {"tec": "ko-soto-gari", "tipo": "projecao", "de": ["em-pe", "pe"], "para": ["controle-lateral", "cima"], "gatilho": "Uke põe o peso no calcanhar da perna da frente", "nota": "Tori termina em pé ao lado do quadril de Uke e desce para o 100 quilos."},
  {"tec": "sasae-tsurikomi-ashi", "tipo": "projecao", "de": ["em-pe", "pe"], "para": ["controle-lateral", "cima"], "gatilho": "Uke puxado para a frente, sobre o pé direito", "nota": "Tori termina em pé e desce para o 100 quilos."},
  {"tec": "okuri-ashi-barai", "tipo": "projecao", "de": ["em-pe", "pe"], "para": ["controle-lateral", "cima"], "gatilho": "Uke se desloca de lado, juntando os pés", "nota": "Tori termina em pé e desce para o 100 quilos."},
  {"tec": "koshi-guruma", "tipo": "projecao", "de": ["em-pe", "pe"], "para": ["controle-lateral", "cima"], "gatilho": "Uke vem para a frente, na ponta dos pés", "nota": "Tori termina em pé e desce para o 100 quilos."},
  {"tec": "hane-goshi", "tipo": "projecao", "de": ["em-pe", "pe"], "para": ["controle-lateral", "cima"], "gatilho": "Uke quebrado para a frente e para a direita", "nota": "Tori termina em pé e desce para o 100 quilos."},
  {"tec": "kata-guruma", "tipo": "projecao", "de": ["em-pe", "pe"], "para": ["controle-lateral", "cima"], "gatilho": "Uke puxado para a frente e para a direita, manga para cima", "nota": "Tori termina em pé e desce para o 100 quilos."},
  {"tec": "tani-otoshi", "tipo": "projecao", "de": ["em-pe", "pe"], "para": ["controle-lateral", "cima"], "gatilho": "Uke com o peso para trás, nos calcanhares", "nota": "Tori termina deitado ao lado de Uke e vira por cima."},
  {"tec": "ura-nage", "tipo": "projecao", "de": ["em-pe", "pe"], "para": ["controle-lateral", "cima"], "gatilho": "Uke avança para atacar de frente", "nota": "Os dois terminam deitados; Tori vira por cima."},
  {"tec": null, "nome": "Puxar para a guarda", "tipo": "puxar", "de": ["em-pe", "pe"], "para": ["guarda-fechada", "baixo"], "gatilho": "Com pegada na gola e na manga, sentar e fechar as pernas na cintura de Uke"},

  {"tec": "chave-de-braco-da-guarda", "tipo": "finalizacao", "de": ["guarda-fechada", "baixo"], "para": ["finalizado", "fim"], "gatilho": "Uke apoia as mãos no seu peito"},
  {"tec": "sankaku-jime", "tipo": "finalizacao", "de": ["guarda-fechada", "baixo"], "para": ["finalizado", "fim"], "gatilho": "Um braço de Uke dentro e outro fora das suas pernas"},
  {"tec": "juji-jime", "tipo": "finalizacao", "de": ["guarda-fechada", "baixo"], "para": ["finalizado", "fim"], "gatilho": "Uke com a postura quebrada, peito perto do seu"},
  {"tec": "estrangulamento-em-laco", "tipo": "finalizacao", "de": ["guarda-fechada", "baixo"], "para": ["finalizado", "fim"], "gatilho": "Uke abaixa a cabeça com a sua mão já funda na gola"},
  {"tec": "kimura", "tipo": "finalizacao", "de": ["guarda-fechada", "baixo"], "para": ["finalizado", "fim"], "gatilho": "Uke apoia a mão no tatame"},
  {"tec": "guilhotina", "tipo": "finalizacao", "de": ["guarda-fechada", "baixo"], "para": ["finalizado", "fim"], "gatilho": "Uke abaixa a cabeça"},
  {"tec": "omoplata", "tipo": "finalizacao", "de": ["guarda-fechada", "baixo"], "para": ["finalizado", "fim"], "gatilho": "Uke deixa um braço esticado à frente"},
  {"tec": "raspagem-de-tesoura", "tipo": "raspagem", "de": ["guarda-fechada", "baixo"], "para": ["montada", "cima"], "gatilho": "Uke de joelhos, com o peso para a frente"},
  {"tec": "raspagem-pendular", "tipo": "raspagem", "de": ["guarda-fechada", "baixo"], "para": ["montada", "cima"], "gatilho": "Uke com o peso para um lado e a manga presa"},
  {"tec": "raspagem-de-quadril", "tipo": "raspagem", "de": ["guarda-fechada", "baixo"], "para": ["montada", "cima"], "gatilho": "Uke senta para trás e ergue a postura"},
  {"tec": null, "nome": "Uke se levanta e abre a guarda", "tipo": "transicao", "de": ["guarda-fechada", "cima"], "para": ["guarda-aberta", "cima"], "gatilho": "Ficar em pé com a postura reta até os tornozelos se soltarem"},
  {"tec": "abrir-e-passar-a-guarda", "tipo": "passagem", "de": ["guarda-fechada", "cima"], "para": ["controle-lateral", "cima"], "gatilho": "Postura reta, joelho no cóccix de Uke"},

  {"tec": "passagem-toreando", "tipo": "passagem", "de": ["guarda-aberta", "cima"], "para": ["controle-lateral", "cima"], "gatilho": "Uke de guarda aberta, pés no seu quadril; você em pé"},
  {"tec": "passagem-joelho-cruzado", "tipo": "passagem", "de": ["guarda-aberta", "cima"], "para": ["controle-lateral", "cima"], "gatilho": "Uke com os joelhos para cima, sem gancho por dentro"},
  {"tec": "passagem-arrastando-a-perna", "tipo": "passagem", "de": ["guarda-aberta", "cima"], "para": ["controle-lateral", "cima"], "gatilho": "Uke com uma perna esticada no seu quadril"},
  {"tec": "passagem-por-baixo", "tipo": "passagem", "de": ["guarda-aberta", "cima"], "para": ["controle-lateral", "cima"], "gatilho": "Uke deixa uma perna alta e a outra baixa"},
  {"tec": "chave-de-pe-reta", "tipo": "finalizacao", "de": ["guarda-aberta", "cima"], "para": ["finalizado", "fim"], "gatilho": "Uke com o pé no seu quadril e a perna esticada"},
  {"tec": "raspagem-tripe", "tipo": "raspagem", "de": ["guarda-aberta", "baixo"], "para": ["guarda-aberta", "cima"], "gatilho": "Uke em pé na sua guarda, com peso na perna da frente", "nota": "Tori termina de pé; agora é ele quem passa a guarda."},
  {"tec": "raspagem-de-foice", "tipo": "raspagem", "de": ["guarda-aberta", "baixo"], "para": ["guarda-aberta", "cima"], "gatilho": "Uke em pé, com o peso numa perna", "nota": "Tori sobe segurando o pé de Uke; agora é ele quem passa a guarda."},

  {"tec": "raspagem-de-gancho", "tipo": "raspagem", "de": ["borboleta", "baixo"], "para": ["controle-lateral", "cima"], "gatilho": "Uke ajoelhado, com o braço preso por baixo"},
  {"tec": "raspagem-meia-guarda", "tipo": "raspagem", "de": ["meia-guarda", "baixo"], "para": ["controle-lateral", "cima"], "gatilho": "Uke amassa a sua meia-guarda e você está ficando de costas"},

  {"tec": "ude-garami", "tipo": "finalizacao", "de": ["controle-lateral", "cima"], "para": ["finalizado", "fim"], "gatilho": "Uke empurra o seu pescoço com o braço de longe"},
  {"tec": null, "nome": "Passar o joelho para a montada", "tipo": "transicao", "de": ["controle-lateral", "cima"], "para": ["montada", "cima"], "gatilho": "Uke com os braços longe do quadril"},
  {"tec": null, "nome": "Subir para o joelho na barriga", "tipo": "transicao", "de": ["controle-lateral", "cima"], "para": ["joelho-na-barriga", "cima"], "gatilho": "Uke empurra para criar espaço"},
  {"tec": null, "nome": "Girar para o norte-sul", "tipo": "transicao", "de": ["controle-lateral", "cima"], "para": ["norte-sul", "cima"], "gatilho": "Uke vira para o seu lado para fugir"},
  {"tec": null, "nome": "Fuga de quadril e repor a guarda", "tipo": "fuga", "de": ["controle-lateral", "baixo"], "para": ["guarda-fechada", "baixo"], "gatilho": "Cotovelo e joelho colados, espaço para pôr o joelho na frente"},
  {"tec": null, "nome": "Virar de quatro", "tipo": "fuga", "de": ["controle-lateral", "baixo"], "para": ["tartaruga", "baixo"], "gatilho": "Tori alivia o peso do peito"},
  {"tec": null, "nome": "Do joelho na barriga para a montada", "tipo": "transicao", "de": ["joelho-na-barriga", "cima"], "para": ["montada", "cima"], "gatilho": "Uke empurra o joelho e deixa o quadril livre"},

  {"tec": "juji-gatame", "tipo": "finalizacao", "de": ["montada", "cima"], "para": ["finalizado", "fim"], "gatilho": "Uke empurra o seu peito com os braços esticados"},
  {"tec": "kata-gatame", "tipo": "finalizacao", "de": ["montada", "cima"], "para": ["finalizado", "fim"], "gatilho": "Uke empurra com um braço esticado"},
  {"tec": null, "nome": "Tomar as costas", "tipo": "transicao", "de": ["montada", "cima"], "para": ["costas", "cima"], "gatilho": "Uke vira de lado para fugir"},
  {"tec": "saida-da-montada", "tipo": "fuga", "de": ["montada", "baixo"], "para": ["guarda-fechada", "cima"], "gatilho": "Uke com as mãos no seu peito e o peso para a frente"},

  {"tec": "hadaka-jime", "tipo": "finalizacao", "de": ["costas", "cima"], "para": ["finalizado", "fim"], "gatilho": "Uke deixa o pescoço exposto"},
  {"tec": "okuri-eri-jime", "tipo": "finalizacao", "de": ["costas", "cima"], "para": ["finalizado", "fim"], "gatilho": "Uke sentado, com a gola livre"},
  {"tec": null, "nome": "Ganchos e cinto de segurança", "tipo": "transicao", "de": ["tartaruga", "cima"], "para": ["costas", "cima"], "gatilho": "Uke de quatro, com os cotovelos longe dos joelhos"}
 ],
 "sequencias": [
  {"tec": "drill-quadril-kimura-guilhotina", "de": ["guarda-fechada", "baixo"], "passos": ["raspagem-de-quadril", "kimura", "guilhotina"]}
 ]
};
