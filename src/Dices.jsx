const Dices = (props) => {
    return (
        <div className="dices-container">
            {
                props.dices.map(dice => {
                    return (
                        <div
                            className="dice"
                            key={dice.id}
                            onClick={(e) => props.handleClick(dice.id)}
                            style={{ backgroundColor: dice.isSelected ? "#59E391" : "" }}
                        >
                            {dice.value}
                        </div>
                    )
                })
            }
        </div> 
    )
};

export default Dices;