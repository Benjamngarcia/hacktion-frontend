// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Button, Typography, Container, Box, TextField, useTheme, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
// import { useRouter } from "next/router";

// const Welcome = () => {
//   const [tokens, setTokens] = useState(null);
//   const [notionToken, setNotionToken] = useState("");
//   const [githubToken, setGithubToken] = useState("");
//   const [error, setError] = useState("");
//   const [notionBoards, setNotionBoards] = useState([]);
//   const [githubRepos, setGithubRepos] = useState([]);
//   const [selectedBoard, setSelectedBoard] = useState("");
//   const [selectedRepo, setSelectedRepo] = useState("");
//   const router = useRouter();
//   const theme = useTheme();

//   useEffect(() => {
//     const fetchTokens = async () => {
//       try {
//         const idUser = localStorage.getItem("idUser");
//         console.log("idUser", idUser);
//         const response = await axios.get("http://localhost:8080/get-tokens?idUsuario=" + idUser);
//         console.log("response", response);

//         if (response.data.tokens) {
//           setTokens(response.data.tokens);
//           fetchNotionBoards(response.data.tokens.notion_token);
//           fetchGithubRepos(response.data.tokens.github_token);
//         }
//       } catch (error) {
//         console.error("Failed to fetch tokens:", error);
//       }
//     };

//     fetchTokens();
//   }, []);

//   const fetchNotionBoards = async (notionToken) => {
//     try {
//       const response = await axios.get("http://localhost:8080/notion-boards", {
//         headers: {
//           Authorization: `Bearer ${notionToken}`
//         }
//       });
//       setNotionBoards(response.data.boards);
//     } catch (error) {
//       console.error("Failed to fetch Notion boards:", error);
//     }
//   };

//   const fetchGithubRepos = async (githubToken) => {
//     try {
//       const response = await axios.get("http://localhost:8080/github-repos", {
//         headers: {
//           Authorization: `Bearer ${githubToken}`
//         }
//       });
//       setGithubRepos(response.data.repos);
//     } catch (error) {
//       console.error("Failed to fetch GitHub repos:", error);
//     }
//   };

//   const handleSaveTokens = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const token = localStorage.getItem("authToken");
//       await axios.post("http://localhost:8080/saveToken", {
//         notionToken,
//         githubToken,
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       // Actualizar la vista después de guardar los tokens
//       setTokens({ notion_token: notionToken, github_token: githubToken });
//       fetchNotionBoards(notionToken);
//       fetchGithubRepos(githubToken);
//     } catch (error) {
//       setError("Failed to save tokens. Please try again.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Aquí puedes manejar la lógica para trabajar con el tablero y repositorio seleccionados
//     console.log("Selected Notion Board:", selectedBoard);
//     console.log("Selected GitHub Repo:", selectedRepo);
//     // Redirigir a otra página si es necesario
//     // router.push("/another-page");
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box
//         display="flex"
//         flexDirection="column"
//         justifyContent="center"
//         alignItems="center"
//         minHeight="100vh"
//         bgcolor={theme.palette.background.paper}
//         padding={3}
//         borderRadius={1}
//       >
//         <Typography variant="h4" component="h1" gutterBottom>
//           Welcome
//         </Typography>
//         {tokens ? (
//           <form onSubmit={handleSubmit}>
//             <FormControl fullWidth margin="normal">
//               <InputLabel>Notion Board</InputLabel>
//               <Select
//                 value={selectedBoard}
//                 onChange={(e) => setSelectedBoard(e.target.value)}
//               >
//                 {notionBoards.map((board) => (
//                   <MenuItem key={board.id} value={board.id}>
//                     {board.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//             <FormControl fullWidth margin="normal">
//               <InputLabel>GitHub Repo</InputLabel>
//               <Select
//                 value={selectedRepo}
//                 onChange={(e) => setSelectedRepo(e.target.value)}
//               >
//                 {githubRepos.map((repo) => (
//                   <MenuItem key={repo.id} value={repo.id}>
//                     {repo.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//             <Box mt={2}>
//               <Button type="submit" variant="contained" color="primary" fullWidth>
//                 Submit
//               </Button>
//             </Box>
//           </form>
//         ) : (
//           <form onSubmit={handleSaveTokens}>
//             <TextField
//               label="Notion Token"
//               variant="outlined"
//               fullWidth
//               margin="normal"
//               value={notionToken}
//               onChange={(e) => setNotionToken(e.target.value)}
//             />
//             <TextField
//               label="GitHub Token"
//               variant="outlined"
//               fullWidth
//               margin="normal"
//               value={githubToken}
//               onChange={(e) => setGithubToken(e.target.value)}
//             />
//             {error && (
//               <Typography color="error" variant="body2">
//                 {error}
//               </Typography>
//             )}
//             <Box mt={2}>
//               <Button type="submit" variant="contained" color="primary" fullWidth>
//                 Save Tokens
//               </Button>
//             </Box>
//           </form>
//         )}
//       </Box>
//     </Container>
//   );
// };

// export default Welcome;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Typography, Container, Box, TextField, useTheme, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { useRouter } from "next/router";

const Welcome = () => {
  const [tokens, setTokens] = useState(null);
  const [notionToken, setNotionToken] = useState("");
  const [githubToken, setGithubToken] = useState("");
  const [error, setError] = useState("");
  const [notionBoards, setNotionBoards] = useState([]);
  const [githubRepos, setGithubRepos] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState("");
  const [selectedRepo, setSelectedRepo] = useState("");
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const idUser = localStorage.getItem("idUser");
        const response = await axios.get("http://localhost:8080/get-tokens", {
          params: { idUsuario: idUser }
        });

        if (response.data.tokens) {
          setTokens(response.data.tokens);
          fetchNotionBoards(response.data.tokens.notion_token);
          fetchGithubRepos(response.data.tokens.github_token);
        }
      } catch (error) {
        console.error("Failed to fetch tokens:", error);
      }
    };

    fetchTokens();
  }, []);

  const fetchNotionBoards = async (notionToken) => {
    try {
      const response = await axios.get("http://localhost:8080/notion-boards", {
        notionToken
      });
      setNotionBoards(response.data.boards);
    } catch (error) {
      console.error("Failed to fetch Notion boards:", error);
    }
  };

  const fetchGithubRepos = async (githubToken) => {
    try {
      const response = await axios.get("http://localhost:8080/github-repos", {
        githubToken
      });
      setGithubRepos(response.data.repos);
    } catch (error) {
      console.error("Failed to fetch GitHub repos:", error);
    }
  };

  const handleSaveTokens = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("authToken");
      await axios.post("http://localhost:8080/saveToken", {
        notionToken,
        githubToken,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Actualizar la vista después de guardar los tokens
      setTokens({ notion_token: notionToken, github_token: githubToken });
      fetchNotionBoards(notionToken);
      fetchGithubRepos(githubToken);
    } catch (error) {
      setError("Failed to save tokens. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica para trabajar con el tablero y repositorio seleccionados
    console.log("Selected Notion Board:", selectedBoard);
    console.log("Selected GitHub Repo:", selectedRepo);
    // Redirigir a otra página si es necesario
    // router.push("/another-page");
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor={theme.palette.background.paper}
        padding={3}
        borderRadius={1}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome
        </Typography>
        {tokens ? (
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Notion Board</InputLabel>
              <Select
                value={selectedBoard}
                onChange={(e) => setSelectedBoard(e.target.value)}
              >
                {notionBoards.map((board) => (
                  <MenuItem key={board.id} value={board.id}>
                    {board.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>GitHub Repo</InputLabel>
              <Select
                value={selectedRepo}
                onChange={(e) => setSelectedRepo(e.target.value)}
              >
                {githubRepos.map((repo) => (
                  <MenuItem key={repo.id} value={repo.id}>
                    {repo.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box mt={2}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit
              </Button>
            </Box>
          </form>
        ) : (
          <form onSubmit={handleSaveTokens}>
            <TextField
              label="Notion Token"
              variant="outlined"
              fullWidth
              margin="normal"
              value={notionToken}
              onChange={(e) => setNotionToken(e.target.value)}
            />
            <TextField
              label="GitHub Token"
              variant="outlined"
              fullWidth
              margin="normal"
              value={githubToken}
              onChange={(e) => setGithubToken(e.target.value)}
            />
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            <Box mt={2}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Save Tokens
              </Button>
            </Box>
          </form>
        )}
      </Box>
    </Container>
  );
};

export default Welcome;

