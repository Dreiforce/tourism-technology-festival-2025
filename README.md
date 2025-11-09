# Tourism Technology Festival 2025
https://tourism-technology.com/

Welcome to our submission to the **Tourism Technology Festival 2025**!  
This repository contains the source code, documentation, and all relevant materials for our innovative tourism technology project.

---

## 🚀 Project Overview

1. Preprocessing (python)
2. Search (react)
3. Fetching satellite data (python)
4. Processing data (python)
5. Visualisation (react)

---

## 📦 Repository Structure

```
├── src/                # Source code
├────── preprocesing/   # 1. Preprocessing of data
├────── search/         # 2. React app for search
├────── processing/     # 3. & 4. Fechting and processing of satellite data
├────── visualisation/  # 5. Visualisation of data
├── presentation/       # Presentation
├── .github/            # Community health files (issues, pull requests)
└── README.md           # Project description
```

---

## 🔧 Getting Started

1. **Clone the repository**
    ```bash
    git clone https://github.com/Dreiforce/tourism-technology-festival-2025.git
    cd tourism-technology-festival-2025
    ```
2. **Download and preprocess data**

    Go to https://hub.austria.info/connections/104c5a26-2f36-4716-b25c-0d16af31a0bd
    
    Download and save to `preprocessing/Tours.json`

    ```bash
     python preprocessing/filter.py
     ```
2. **Install frontend dependencies**  
   ```bash
    cd search
    npm install
    ```
3. **Run the project**
    ```bash
    npm run dev
    ```
4. **View the demo**  
   Open the browser and go to `localhost:8080`
---

## 🚀 Getting Started

in directory src/search run
``` 
npm run build
```

in directory backend run 
``` 
go run main.go
```

make sure to set the correct OPENEO_CONFIG_HOME in the backend.go file to get sat auth working
run the processing pipeline manually once to create the auth token file
```
python Sentinel_3.py
```

## 👥 Contributors

- [Jakob Geringer](https://github.com/KingPao) – AI Expert
- [Simon Lehner-Dittenberger](https://github.com/MightyDuckD) – Backend Development
- [Lukas Wallenböck](https://github.com/fireplanet) – Frontend Development
- [Burcu Taspinar](https://github.com/btaspinar) - Data Scientist
- [Stefan H](https://github.com/stefhol) - User Relations

---

## 📝 License

This project is licensed under the MIT License.  
See [`LICENSE`](LICENSE) for more information.

---

## 📬 Contact

Questions or feedback?  
Feel free to [open an issue](https://github.com/Dreiforce/tourism-technology-festival-2025/issues).

---

Happy exploring – and thank you for visiting our submission!
