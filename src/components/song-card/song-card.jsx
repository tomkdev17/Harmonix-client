export const SongCard = ({songData, onSongClick}) => {
    return (
        <div
            onClick ={() => {
                onSongClick(songData);
            }}
        >
            {songData.title}
        </div>
    );
};