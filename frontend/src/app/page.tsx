"use client"
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Button, TextField, Typography, List, ListItem, ListItemText, ThemeProvider, createTheme, withTheme } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";

import axios from "axios";

export default function Home() {
	const [sortNumbers, setSortNumbers] = useState(true);
	const [extraSortNumber, setExtraSortNumber] = useState(false);
	const [bettingPhase, setBettingPhase] = useState(true);
	const [drawPhase, setDrawPhase] = useState(false);
	const [name, setName] = useState<string>("");
	const [cpf, setFormatedCpf] = useState<string>("");
	const [prizeValue, setPrizeValue] = useState<number>(0)
	const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
	const [isLoadingNewNumber, setIsLoadingNewNumber] = useState(false);
	const [isLoadingNewBet, setIsLoadingNewBet] = useState(false);
	const [bets, setBets] = useState<{ name: string; cpf: string; numbers: number[]; }[]>([])
	const [winners, setWinners] = useState<{ name: string; cpf: string; numbers: number[]; }[]>([])
	const [betEdition, setBetEdition] = useState<{ 
		id_e: string,
		name: string,
		finish: boolean,
		value: string,
		numbersDrawn: number[],
		status: string
	}>({
		id_e: "",
		name: "",
		finish: false,
		value: "",
		numbersDrawn: [],
		status: ""
	});
	const [betEditions, setBetEditions] = useState<{ id_e: string; name: string; }[]>([]);
	const [BetEdition_id, setBetEdition_id] = useState(betEditions.length > 0 ? betEditions[0].id_e : "");
	const [drawnNumbers, setDrawNumbers] = useState<number[]>(betEdition.numbersDrawn)
	const numbers = [];
	for (let i = 1; i <= 50; i++) {
		numbers.push(i);
	}



	const getBetEditions = useCallback(() => {
		axios.get<{ id_e: string; name: string; }[]>("http://localhost:3001/betEditions/read")
			.then((response) => {
				setBetEditions(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	const getEdition = () => {
		axios.get<{
			id_e: string,
			name: string,
			finish: boolean,
			value: string,
			numbersDrawn: number[],
			status: string}[]>("http://localhost:3001/betEditions/read",{ 
				params: {
					BetEdition_id: BetEdition_id
				}
		})
		.then((response) => {
			setBetEdition(response.data[0]);
			setDrawNumbers(response.data[0].numbersDrawn)
			if(response.data[0].numbersDrawn[0]){
				setVisibility()
			}
		})
		.catch((error) => {
			console.error(error);
		});
	};

	const selectEdition = (event: SelectChangeEvent) => {
		setBetEdition_id(event.target.value as string);
	};

	const selectNumber = (number: number) => {
		if (selectedNumbers.includes(number)) {
			setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
		} else if (selectedNumbers.length < 5) {
			setSelectedNumbers([...selectedNumbers, number]);
		}
	};

	const sendBet = () => {
		setIsLoadingNewBet(true)
		if (!name || !cpf || selectedNumbers.length !== 5) {
			alert("Por favor, preencha todos os campos e selecione 5 números para apostar");
			return;
		}

		axios.post("http://localhost:3001/bet/create", { 
			name,
			cpf,
			numbers: selectedNumbers,
			BetEdition_id
		 })
			.then(() => {
				setName("");
				setFormatedCpf("");
				setSelectedNumbers([]);
				getBets();
				setIsLoadingNewBet(false)
			})
			.catch((error) => {
				console.error(error);
				setIsLoadingNewBet(false)
			});	
	};

	const runDraw = () => {
		setVisibility()
		const type = "save"
		axios.post("http://localhost:3001/numbers/generate",{
			BetEdition_id,
			type
		})
		.then((response) => {
			setBetEdition(response.data)
			setDrawNumbers(response.data.numbersDrawn)
		})
		.catch((error) => {
			console.error(error);
		})
	}

	const drawExtraNumber = () => {
		setIsLoadingNewNumber(true);
		axios.post("http://localhost:3001/numbers/generate/extra",{
			BetEdition_id
		})
		.then((response) => {
			setBetEdition(response.data)
			setDrawNumbers(response.data.numbersDrawn)
			setIsLoadingNewNumber(false);
		})
		.catch((error) => {
			console.error(error);
			setIsLoadingNewNumber(false);
		})
	}

	const randomBet = () => {
		const type = "get"
		axios.post("http://localhost:3001/numbers/generate",{
			type
		})
		.then((response) => {
			setSelectedNumbers(response.data)
		})
		.catch((error) => {
			console.error(error);
		});
	}

	const getBets = useCallback(() => {
		axios.get<{ name: string; cpf: string; numbers: number[]; }[]>("http://localhost:3001/bet/read")
			.then((response) => {
				setBets(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	const getWinners = () => {
		console.log(drawnNumbers)
		axios.get<{ name: string; cpf: string; numbers: number[]; }[]>("http://localhost:3001/bet/read/winners", {
			params: {
				drawnNumbers: drawnNumbers
			}
		})
			.then((response) => {
				setWinners(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const formatCpf = (value: string) => {
		return value
		.replace(/\D/g, "")
		.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"); 
	};

	const isValidCpf = (value: string) => {
		return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value); 
	};

	const setCpf = (e: { target: { value: any; }; }) => {
		const inputValue = e.target.value;
		if (/^\d*$/.test(inputValue) && inputValue.length <= 11) {
		  setFormatedCpf(formatCpf(inputValue));
		}
	};

	const holdAwards = () => {
		setPrizeValue( parseInt( betEdition.value ) / winners.length )
		
	}

	const setVisibility = () => {
		setSortNumbers(false);
		setExtraSortNumber(true);
		setBettingPhase(false)
		setDrawPhase(true)
	};

	const newEdition = () => {
		axios.delete("http://localhost:3001/betEdition/clear")
		.then((response) => {

			axios.post("http://localhost:3001/betEdition/create",{
				"name": "Edição 1",
				"value": "1000000"
			})
			.then((response) => {
				getBetEditions()
				setBetEdition_id(betEditions.length > 0 ? betEditions[0].id_e : "")
				getEdition()
				setSortNumbers(true);
				setExtraSortNumber(false);
				setBettingPhase(true)
				setDrawPhase(false)
				getBets()
				setPrizeValue(0)
			})
			.catch((error) => {
				console.error(error);
			})
		})
		.catch((error) => {
			console.error(error);
		})
	}

	useEffect(() => {
		getBetEditions()
		getBets()
	}, [])

	useEffect(() => {
		setBetEdition_id(betEditions.length > 0 ? betEditions[0].id_e : "")
		getEdition()
	}, [betEditions])

	useEffect(() => {
		getEdition()
	}, [BetEdition_id])

	useEffect(() => {
		getWinners()

		if(drawnNumbers.length >= 30){
			setExtraSortNumber(false)
		}
	}, [drawnNumbers])

	useEffect(() => {
		if(winners.length > 0){
			setExtraSortNumber(false)
		}
	}, [winners])


	const darkTheme = createTheme({
			palette: {
				mode: "dark",
				primary: {
					main: "#90caf9" // Azul claro
				},
				secondary: {
					main: "#f48fb1" // Rosa claro
				},
				text: {
					primary: "#fff" // Cor do texto principal (branco)
				}
			}
	});
	
	return (
		<ThemeProvider theme={darkTheme}>
			<Box sx={{
					p: 2,
					backgroundColor: darkTheme.palette.background.default,
					color: darkTheme.palette.text.primary,
					minHeight: "100vh"
				}}>
			<Box sx={{ p: 2 }}>
				<FormControl fullWidth>
					<InputLabel>Edição</InputLabel>
					<Select
						id="edition"
						value={BetEdition_id}
						label="Edição"
						onChange={selectEdition}
					>
						{betEditions.map((edition) => (
							<MenuItem key={edition.id_e} value={edition.id_e}>{edition.name}</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>
			{drawPhase && (
				<Typography sx={{ p: 2 }} variant="body1">Fase de apostas encerrada</Typography>
			)}
			{bettingPhase && (
				<Box>
				<Box sx={{ p: 2 }}>
				<Grid container spacing={2}>
					{numbers.map((number) => (
						<Grid item key={number}>
							<Button
								variant={selectedNumbers.includes(number) ? "contained" : "outlined"}
								onClick={() => selectNumber(number)}
								sx={{ backgroundColor: selectedNumbers.includes(number) ? darkTheme.palette.primary.main : "inherit", color: selectedNumbers.includes(number) ? "#fff" : "inherit" }}
							>
								{number}
							</Button>
						</Grid>
					))}
				</Grid>
				</Box>
			
				<Box sx={{ p: 2 }}>
					<Typography variant="body1">Números selecionados: {selectedNumbers.join(", ")}</Typography>

					<Button variant="contained" onClick={randomBet} color="inherit">Surpresinha</Button>

					<TextField
						label="Nome do Apostador"
						value={name}
						onChange={(e) => setName(e.target.value)}
						fullWidth
						sx={{ mt: 2, mb: 2 }}
					/>
					<TextField
						label="CPF"
						value={cpf}
						onChange={setCpf}
						fullWidth
						sx={{ mb: 2 }}
						error={!isValidCpf(cpf)}
						helperText={!isValidCpf(cpf) && "CPF inválido"}
					/>
					<Button variant="contained" 
						onClick={sendBet} 
						color="inherit"
						disabled={
							selectedNumbers.length !== 5 || 
							!isValidCpf(cpf) ||
							name == "" ||
							isLoadingNewBet}
							>
							{isLoadingNewBet ? 'Registrando...' : 'Apostar'}
					</Button>
				</Box>
				</Box>
			)}
			
			
			
			<Box sx={{ p: 2 }}>

				{sortNumbers && (
					<Button
					variant="contained"
					onClick={() => {
					  if (window.confirm("Tem certeza que deseja finalizar as apostas e executar o sorteio?")) {
						runDraw();
					  }
					}}
					color="inherit"
				  >
					Finalizar apostas e executar sorteio
				  </Button>
				)}
				{extraSortNumber && (
					<Button
						variant="contained"
						onClick={drawExtraNumber}
						color="inherit"
						disabled={isLoadingNewNumber}
						>
						{isLoadingNewNumber ? 'Sorteando...' : 'Sortear Número Extra'}
				  	</Button>
				)}
				
				<Typography variant="body1">Números sorteados: {drawnNumbers.join(", ")}</Typography>
			</Box>

			<Box sx={{ p: 2 }}>
				{winners.length <= 0 && drawnNumbers.length >= 30 &&(
					<Typography variant="body1"> Não houve ganhadores </Typography>
				)}
			
				{!(drawnNumbers.length >= 30 && winners.length <= 0) &&(
					<Box sx={{ width: "100%", bgcolor: "background.paper" }}>
						<Typography variant="h6" gutterBottom component="div">
							Lista de Ganhadores
						</Typography>
						<List>
							{winners.map((bet, index) => (
								<ListItem key={index}>
									<ListItemText
										primary={`Ganhador ${index + 1}`}
										secondary={`Nome: ${bet.name}, CPF: ${bet.cpf}, Números: ${bet.numbers.join(", ")}`}
									/>
								</ListItem>
							))}
						</List>
					</Box>
				)}

				{(winners.length > 0 && prizeValue == 0) && (
					<Button
						variant="contained"
						onClick={holdAwards}
						color="inherit"
						>
						Realizar premiação
				  	</Button>
				)}

				{(prizeValue > 0) && (
					<Typography variant="h6" gutterBottom component="div">
						O valor da premiação para cada ganhador é de R$ {prizeValue}
					</Typography>
				)}
				

			</Box>

			<Box sx={{ p: 2 }}>
				<Box sx={{ width: "100%", bgcolor: "background.paper" }}>
					<Typography variant="h6" gutterBottom component="div">
						Lista de Apostas
					</Typography>
					<List>
						{bets.map((bet, index) => (
							<ListItem key={index}>
								<ListItemText
									primary={`Aposta ${index + 1}`}
									secondary={`Nome: ${bet.name}, CPF: ${bet.cpf}, Números: ${bet.numbers.join(", ")}`}
								/>
							</ListItem>
						))}
					</List>
				</Box>
			</Box>
			<Button
					variant="contained"
					onClick={() => {
					  if (window.confirm("Tem certeza que deseja reiniciar as apostas?")) {
						newEdition();
					  }
					}}
					color="inherit"
				  >
					Finalizar edição e reiniciar
				  </Button>
			</Box>
		</ThemeProvider>
	);
}
