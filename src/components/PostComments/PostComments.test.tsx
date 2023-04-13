import { fireEvent, render, screen } from "@testing-library/react";
import PostComment from ".";

describe("Teste para o componente PostComment", () => {
  it("Deve renderizar o componente corretamente", () => {
    render(<PostComment />);
    expect(screen.getByText("Comentar")).toBeInTheDocument();
  });

  test("Deve renderizar 1 comentário no Post", () => {
    //tentativa simples para tarefa
    render(<PostComment />);
    const COMMENTARY1 = "commentary1";
    const TEXTAREA = screen.getByTestId("commentary-textarea");
    const FORM = screen.getByTestId("form-add-comment");

    // TEXTAREA.innerText += COMMENTARY1 (!!! ERRADO)
    // NÃO PODEMOS SIMPLESMENTE DETERMINAR O INNERTEXT pois o setTempComment depende do onChange
    fireEvent.change(TEXTAREA, {
      target: {
        value: COMMENTARY1,
      },
    });
    fireEvent.submit(FORM);
    expect(screen.getByText(COMMENTARY1)).toBeInTheDocument();
  });

  test("Deve renderizar 2 comentários no Post", () => {
    // Tarefa feita
    render(<PostComment />);
    const TEXTAREA = screen.getByTestId("commentary-textarea");
    const FORM = screen.getByTestId("form-add-comment");

    for (let i = 1; i <= 2; i++) {
      fireEvent.change(TEXTAREA, {
        target: {
          value: `commentary${i}`,
        },
      });
      fireEvent.submit(FORM);
    }
    expect(
      screen.getByText("commentary1" && "commentary2")
    ).toBeInTheDocument();
  });
});
