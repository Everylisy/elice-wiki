import { useState } from "react";
import { Button, Divider } from "@mui/material";
import styled from "styled-components";
import PostList from "./PostList";

const Home = () => {
    const [isClicked, setIsClicked] = useState(new Array(25).fill(false));
    const handleClick = (e) => {
        const newArr = new Array(25).fill(false);
        newArr[e.target.value] = !newArr[e.target.value];
        setIsClicked(newArr);
    };

    return (
        <>
            <div style={{ minHeight: "100vh", height: "auto" }}>
                <header style={{ height: "60px" }} />
                <WeekNav>
                    <Button disabled style={{ color: "black" }}>
                        WEEK
                    </Button>

                    {new Array(24).fill(null).map((_, idx) => (
                        <>
                            <Button
                                value={idx}
                                key={`week_${idx}`}
                                size="small"
                                variant={isClicked[idx] ? "contained" : "text"}
                                sx={{
                                    minWidth: "2.5%",
                                    maxHeight: "50%",
                                    borderRadius: "30px",
                                    margin: "0 3px",
                                }}
                                onClick={handleClick}
                            >
                                {String(idx + 1).padStart(2, "0")}
                            </Button>
                            <Divider
                                orientation="vertical"
                                variant="middle"
                                flexItem
                            />
                        </>
                    ))}

                    <Button
                        value={24}
                        variant={isClicked[24] ? "contained" : "text"}
                        size="small"
                        sx={{
                            minWidth: "3%",
                            maxHeight: "50%",
                            borderRadius: "30px",
                            margin: "0 3px",
                        }}
                        onClick={handleClick}
                    >
                        기타
                    </Button>
                </WeekNav>
                <Container>
                    <ContentsSide />
                    <Contents>
                        <PostList />
                    </Contents>
                    <ContentsSide />
                </Container>
            </div>
        </>
    );
};

const WeekNav = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 40px;
    background-color: #f1f1f1;
`;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: calc(100vh - 100px);
    background-color: #e1e1e1;
`;

const ContentsSide = styled.div`
    width: 25%;
    background-color: white;
`;

const Contents = styled.div`
    width: 50%;
    background-color: #f1f1f1;
    overflow: scroll;
    // &::-webkit-scrollbar {
    //     width: 10px;
    // }
    // &::-webkit-scrollbar-track {
    //     background: #f1f1f1;
    //     margin-left: -10px;
    // }
    // &::-webkit-scrollbar-thumb {
    //     background: #7353ea;
    // }
    // &::-webkit-scrollbar-thumb:hover {
    //     background: #555;
    // }
`;

export default Home;
