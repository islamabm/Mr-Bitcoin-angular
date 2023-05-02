import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import axios from 'axios';
import { storageService } from './async-storage.service';

@Injectable({
  providedIn: 'root',
})
export class BitcoinService {
  constructor(private http: HttpClient) {}

  getRate(coins: number) {
    const url = `https://blockchain.info/tobtc?currency=USD&value=${coins}`;
    return this.http.get(url, { responseType: 'text' }).pipe(
      map((response: string) => {
        const rate = parseFloat(response);
        return rate;
      })
    );
  }
  async getMarketPrice() {
    const MARKET_PRICE_KEY = 'market-price';
    const storedMarketPrices = storageService.load(MARKET_PRICE_KEY);
    if (storedMarketPrices) return Promise.resolve(storedMarketPrices);
    try {
      const response = await axios.get(
        `https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true`
      );
      const data = response.data;
      storageService.save(MARKET_PRICE_KEY, data);
      return Promise.resolve(data);
    } catch (err) {
      console.error('Error getting market prices:', err);
      return null;
    }
  }

  async getConfirmedTransactions() {
    const BLOCK_SIZE_KEY = 'block-size';
    const storedBlockSizes = storageService.load(BLOCK_SIZE_KEY);
    if (storedBlockSizes) return Promise.resolve(storedBlockSizes);
    try {
      const response = await axios.get(
        `https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true`
      );
      const data = response.data;
      storageService.save(BLOCK_SIZE_KEY, data);
      return Promise.resolve(data);
    } catch (err) {
      console.error('Error getting block size:', err);
      return null;
    }
  }
}
