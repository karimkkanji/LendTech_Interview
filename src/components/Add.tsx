interface AddProps {
    add: any
}

const Add = (props: AddProps) => {
    const { add } = props;
    return (<button className='btn btn-arithmetic' onClick={add}>+</button>);
}

export default Add;