interface RandomDataProps {
    randomData: any
}

const RandomData = (props: RandomDataProps) => {
    const { randomData } = props;
    return (<button className='btn btn-random' onClick={randomData}>Random Data</button>);
}

export default RandomData;