export function ShowRatingItem({ rating }) {
    let icon = 'bi bi-star';

    if (rating - 1 >= 0) {
        icon += '-fill';
    } else if (rating > 0) {
        icon += '-half';
    }

    return (
        <div>
            <i className={icon}></i>
        </div>
    );
}
