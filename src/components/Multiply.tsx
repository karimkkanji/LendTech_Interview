interface MultiplyProps {
    multiply: any
}

const Multiply = (props: MultiplyProps) => {
    const { multiply } = props;
    return (<button className='btn btn-multiply' onClick={multiply}>Multiply</button>);
}

export default Multiply;