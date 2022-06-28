interface ResetProps {
    reset: any
}

const Reset = (props: ResetProps) => {
    const { reset } = props;
    return (<button className='btn btn-reset' onClick={reset}>Reset</button>);
}

export default Reset;