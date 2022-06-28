interface SquareProps {
    squareRoot: any
}

const Square = (props: SquareProps) => {
    const { squareRoot } = props;
    return (<button className='btn btn-square' onClick={squareRoot}>Square</button>);
}

export default Square;