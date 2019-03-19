import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import {
    suffleCard,
    loadDesk,
    drawCard,
    revealCard,
    closeModal
} from "./../../../../actions";
import Modal from 'react-modal';
import { maxBy } from 'lodash';
const customStylesModal = {
    content: {
        width: '20%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
class CardPage extends Component {
    constructor(props) {
        super(props);
        this.handleSuffle = this.handleSuffle.bind(this);
        this.handleDraw = this.handleDraw.bind(this);
        this.handleReveal = this.handleReveal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal() {
        const { closeModal } = this.props;
        if (closeModal) {
            closeModal();
            window.location.reload();
        }
    }

    renderPlayerWin(players) {
        let xhtml = null;
        let listPlayersWin = [];
        const maxPoint = maxBy(players, player => player.point);
        listPlayersWin = players.filter(
            player => player.point === maxPoint.point
        );
        xhtml = (
            <table border={1}>
                <thead>
                    <tr>
                        <td><strong>Player</strong></td>
                        <td><strong>Point</strong></td>
                    </tr>
                </thead>
                <tbody>
                    {listPlayersWin.map(player => {
                        return (
                            <tr key={player.id}>
                                <td>{player.name}</td>
                                <td>{Math.round(player.point)} point</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
        return xhtml;
    }

    render() {
        const { finished, players } = this.props;
        return (
            <Wrapper>
                <Title>
                    Play cards
                </Title>
                <Content>
                    {this.renderTable()}
                </Content>

                <Modal
                    isOpen={finished}
                    style={customStylesModal}
                // onRequestClose={this.closeModal}
                >
                    <h4>Congratulation</h4>
                    {this.renderPlayerWin(players)}
                    <WrapperButton>
                        <button
                            onClick={this.closeModal}
                        >
                            Close
                        </button>
                    </WrapperButton>
                </Modal>
            </Wrapper>
        );
    }

    componentDidMount() {
        const { loadDesk } = this.props;
        if (loadDesk) {
            loadDesk();
        }
    }

    renderRound() {
        const { round } = this.props
        let xhtml = null;
        xhtml = <TextRound>Round: {round}</TextRound>
        return xhtml;
    }

    renderTable() {
        let xhtml = null;
        xhtml =
            <Table>
                {this.renderPlayers()}
                {this.renderTranscript()}
                {this.renderRound()}
            </Table>;
        return xhtml;
    }

    handleSuffle() {
        const { suffleCard, deck_id } = this.props;
        if (suffleCard) {
            suffleCard(deck_id);
        }
    }

    handleDraw() {
        const { drawCard, deck_id } = this.props;
        if (drawCard) {
            drawCard(deck_id);
        }
    }

    handleReveal() {
        const { revealCard } = this.props;
        if (revealCard) {
            revealCard();
        }
    }

    renderTranscript() {
        const {
            players,
            shuffled,
            isDrawing,
            finished
        } = this.props;
        let xhtml = null;
        xhtml = (
            <Transcript>
                <div className='actionButton'>
                    <WrapperButton>
                        <button
                            onClick={this.handleSuffle}
                            disabled={shuffled || finished}
                        >
                            Shuffle
                        </button>
                    </WrapperButton>
                    <WrapperButton>
                        <button
                            disabled={!shuffled || isDrawing || finished}
                            onClick={this.handleDraw}
                        >
                            Draw
                    </button>
                    </WrapperButton>
                    <WrapperButton>
                        <button
                            disabled={!shuffled || !isDrawing || finished}
                            onClick={this.handleReveal}
                        >
                            Reveal
                    </button>
                    </WrapperButton>

                </div>
                <div className='point'>
                    <table border={1}>
                        <thead>
                            <tr>
                                <td><strong>Player</strong></td>
                                <td><strong>Point</strong></td>
                            </tr>
                        </thead>
                        <thead>
                            {players.map(player => {
                                return (
                                    <tr key={player.id}>
                                        <td>
                                            {player.name} {player.isMe ? "(me)" : ""}
                                        </td>
                                        <td>
                                            {Math.round(player.point)} point
                                        </td>
                                    </tr>
                                );
                            })}
                        </thead>
                    </table>
                </div>
            </Transcript>
        )
        return xhtml;
    }

    getPosition(position) {
        // eslint-disable-next-line default-case
        switch (position) {
            case 'top':
                return {
                    top: '2px',
                    left: "40%",
                }
            case 'bottom':
                return {
                    bottom: '14px',
                    left: "40%",
                }
            case 'right':
                return {
                    top: "40%",
                    right: '2px',
                }
            case 'left':
                return {
                    top: "40%",
                    left: '2px',
                }
        }
    }

    renderCard(player) {
        let xhtml = null;
        if (player.cards.length &&
            player.cards[0].isUpSideDown
        ) {
            xhtml = (
                this.renderCardDown()
            )
        }
        if (player.cards.length &&
            !player.cards[0].isUpSideDown
        ) {
            xhtml = (
                this.renderCardUp(player)
            )
        }
        return xhtml;
    }

    renderCardUp(player) {
        let xhtml = [];
        if (player && player.cards && player.cards.length > 0) {
            for (let i = 0; i < 3; i++) {
                xhtml.push(
                    <img
                        className="card"
                        alt=""
                        key={i}
                        src={player.cards[i].image}
                    />
                );
            }
        }
        return xhtml;
    }

    renderCardDown() {
        let xhtml = [];
        for (let i = 0; i < 3; i++) {
            xhtml.push(
                <img
                    className="card"
                    alt=""
                    key={i}
                    src="https://ic.pics.livejournal.com/dailyafirmation/691132/529371/529371_original.jpg"
                />
            );
        }
        return <div>{xhtml}</div>;
    }

    renderPlayers() {
        const { players } = this.props;
        let xhtml = null;
        let renderCard = null;
        if (players && players.length > 0) {
            xhtml = players.map((player, index) => {
                renderCard = <Card>{this.renderCard(player)}</Card>
                return (
                    <Player
                        position={this.getPosition(player.position)}
                        key={index}
                    >
                        {player.name}
                        {renderCard}
                    </Player>
                )
            });
        }
        return xhtml;
    }
}

const TextRound = styled.span`
    color: white;
    font-size: 20px;
    position: absolute;
    right: 40px;
    top: 30px;
`

const Wrapper = styled.div`
    padding: 0 100px;
`

const Title = styled.div`
    font-weight: bold;
    text-align: center;
    margin-top: 20px;
    font-size: 24px;
`

const Content = styled.div`
    margin-top: 10px;
    min-height: 600px;
    background-color: #ad1026;
    width: 100%;
    boxShadow: "black 0 0 10px",
`

const Table = styled.div`
    position: relative;
    height: 600px;
`

const Transcript = styled.div`
    table {
        margin-top: 10px;
        background: white;
        color: black;
        min-width: 300px
    }
`

const Player = styled.div`
    position: absolute;
    top: ${props => (props.position.top ? props.position.top : '')};
    right: ${props => (props.position.right ? props.position.right : '')};
    bottom: ${props => (props.position.bottom ? props.position.bottom : '')};
    left: ${props => (props.position.left ? props.position.left : '')};
    text-align: center;
    min-width: 200px;
    color: white;
`

const Card = styled.div`
    .card {
        height: 100px;
    }
`

const WrapperButton = styled.span`
    button {
        padding: 10px
    }
`


CardPage.propTypes = {
    suffleCard: PropTypes.func,
    loadDesk: PropTypes.func,
    drawCard: PropTypes.func,
    closeModal: PropTypes.func,
    revealCard: PropTypes.func,
    players: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    deck_id: PropTypes.string,
    round: PropTypes.number,
    shuffled: PropTypes.bool,
    isDrawing: PropTypes.bool,
    finished: PropTypes.bool
};

CardPage.defaultProps = {};
const mapStateToProps = state => {
    return {
        players: state.card.players,
        deck_id: state.card.deck_id,
        shuffled: state.card.shuffled,
        isDrawing: state.card.isDrawing,
        round: state.card.round,
        finished: state.card.finished
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        suffleCard: (deck_id) => {
            dispatch(suffleCard(deck_id));
        },
        loadDesk: () => {
            dispatch(loadDesk());
        },
        drawCard: (deck_id) => {
            dispatch(drawCard(deck_id));
        },
        revealCard: () => {
            dispatch(revealCard());
        },
        closeModal: () => {
            dispatch(closeModal());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardPage);
