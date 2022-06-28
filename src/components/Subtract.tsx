interface SubtractProps {
    subtract: any
}

const Subtract = (props: SubtractProps) => {
    const { subtract } = props;
    return (<button className='btn btn-arithmetic' onClick={subtract}>-</button>);
}

export default Subtract;