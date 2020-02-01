import { Spinner } from 'styled-icons/evil';
import { Comment } from 'styled-icons/boxicons-solid';
import styled, { keyframes } from 'styled-components';

const CommentList = styled.div`
  align-self: center;
  margin: 0;
  color: #999999;
  max-width: 659px;
  min-width: 600px;
  font-size: 12px; 
  box-sizing: border-box;
  font-family: "InterstateSound Tnum", Interstate, "Lucida Grande", "Lucida Sans Unicode","Lucida Sans",Garuda,Verdana,Tahoma,sans-serif;
`
const CommentIcon = styled(Comment)`
  display: inline;
  height: 1.2em;
`

const LoadingKeyFrames = keyframes`
  0% { transform: rotate(0deg); };
  8% { transform: rotate(30deg); }
  16% { transform: rotate(60deg); }
  25% { transform: rotate(90deg); }
  33% { transform: rotate(120deg); }
  41% { transform: rotate(150deg); }
  50% { transform: rotate(180deg); }
  58% { transform: rotate(210deg); }
  66% { transform: rotate(240deg); }
  75% { transform: rotate(270deg); }
  88% { transform: rotate(300deg); }
  91% { transform: rotate(330deg); }
  100% { transform: rotate(360deg); }
`

const SpinnerIcon = styled(Spinner)`
  display: block;
  margin: auto;
  height: 80px;
  width:  80px;
  animation: ${LoadingKeyFrames} .75s infinite step-end;
`

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 300px;
`

export {
  SpinnerContainer,
  SpinnerIcon,
  CommentIcon,
  CommentList,
}