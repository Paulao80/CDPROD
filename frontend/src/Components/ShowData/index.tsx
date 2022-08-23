import './style.css';

type props = {
    Label: string;
    Data?: any;
};

const ShowData = ({ Label, Data }: props) => {
    return (
        <div className="dl-ent">
            <label>{Label}:</label>
            <span>{Data}</span>
        </div>
    );
}

export default ShowData;