import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {
  const [techs, setTech] = useState(['ReactJS', 'ReactNative']);
  const [newTech, setNewTech] = useState('');

  const handleAdd = useCallback(() => {
    setTech([...techs, newTech]);
    setNewTech('');
  }, [newTech, techs]);

  // DidMount: executa somente da primeira vez que o componente é carregado em tela
  // Quando não passamos nada para o useEffect monitorar (segundo parametro da função),
  // ele só é executado quando o componente é renderizado
  useEffect(() => {
    const listTech = localStorage.getItem('techs');

    if (listTech) setTech(JSON.parse(listTech));

    // para utilizar como um didWillUnmount, é necessario ao final da função implementar a função do que irá ser feito ao deixar de carregar:
    // return() => {faz qualquer coisa};
  }, []);

  // DidUpdate: monitorar alterações na lista de tecnologias =>
  useEffect(() => {
    localStorage.setItem('techs', JSON.stringify(techs));
  }, [techs]);

  // só será executada quando a variavel techs tiver seu valor alterado
  const techSize = useMemo(() => techs.length, [techs]);

  return (
    <>
      <ul>
        {techs.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      <strong>VocÊ tem {techSize} tecnologias.</strong>
      <br />
      <input value={newTech} onChange={(e) => setNewTech(e.target.value)} />
      <button type="button" onClick={handleAdd}>
        Adicionar
      </button>
    </>
  );
}

export default App;
