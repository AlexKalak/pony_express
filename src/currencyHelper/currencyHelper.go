package currencyhelper

import (
	"encoding/json"
	"fmt"
	"io"
	"math"
	"net/http"
	"time"
)

type Currency string

type Quotes struct {
	TRY float64 `json:"USDTRY"`
}

type ApiResponse struct {
	Success        bool     `json:"success"`
	SourceCurrency Currency `json:"source"`
	Quotes         Quotes   `json:"quotes"`
}

const (
	apiCurrencyFloating = 100_000
)

var TRYPrice int

func StartGettingCurrencies(delay time.Duration) {
	for {
		client := &http.Client{}

		url := "https://api.apilayer.com/currency_data/live?source=USD&currencies=TRY"
		access_key := "YTGixYk5pbYK9DgLfSYA7oPcXa614vUx"

		req, _ := http.NewRequest("GET", url, nil)
		req.Header.Set("apikey", access_key)

		resp, err := client.Do(req)
		if err != nil {
			panic(err)
		}

		bytes, err := io.ReadAll(resp.Body)
		if err != nil {
			panic(err)
		}

		fmt.Println(string(bytes))

		var currencyInf ApiResponse
		err = json.Unmarshal(bytes, &currencyInf)
		if err != nil {
			panic(err)
		}

		TRYPrice = int(currencyInf.Quotes.TRY * apiCurrencyFloating)

		time.Sleep(delay)
	}
}

func ConvertTRYtoUSD(tryCount int) int {
	f_price := float64(tryCount) / (float64(TRYPrice) / apiCurrencyFloating)
	i_price := int(math.Round(f_price))
	return i_price
}
