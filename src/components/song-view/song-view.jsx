export const SongView = ({songData, onBackClick}) => {
    return (
        <div>
            <img src={songData.image} alt={songData.title}/>
            <div>
                <span>Title: </span>
                <span>{songData.title}</span>       
            </div>
            <div>
                <span>Artist: </span>
                <span>{songData.artist}</span>
            </div>
                <button onClick={onBackClick}>Back</button>
        </div>
    )
}