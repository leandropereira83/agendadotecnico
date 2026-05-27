import { inject, Injectable } from '@angular/core';
import localforage from 'localforage';
import { environment } from '../environments/environment';
import { PoNotificationService } from '@po-ui/ng-components';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  private instance: LocalForage;
  private notify = inject(PoNotificationService)

  constructor() {
    this.instance = localforage.createInstance({
      name: environment.STORAGE_NAME,storeName: environment.STORAGE_STORE_NAME
    });
  }

  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      await this.instance.setItem(key, value);
    } catch (error) {
      console.error(`Erro ao salvar o registro "${key}":`, error);
      this.notify.error(`Erro ao salvar o registro "${key}": ${error}`);
    }
  }

  async getItem<T>(key: string): Promise<T | null> {
    return await this.instance.getItem<T>(key);
  }

  async removeItem(key: string): Promise<void> {
    try {
      await this.instance.removeItem(key);
    } catch (error) {
      console.error(`Erro ao remover o registro "${key}":`, error);
      this.notify.error(`Erro ao remover o registro "${key}": ${error}`);
    }
  }

  async clear(): Promise<void> {
    try {
      await this.instance.clear();
    } catch (error) {
      console.error('Erro ao limpar o armazenamento:', error);
      this.notify.error(`Erro ao limpar o armazenamento: ${error}`);
    }
  }

  async keys(prefixo?: string): Promise<string[]> {
    const allKeys = await this.instance.keys();
    return prefixo ? allKeys.filter(key => key.startsWith(prefixo)) : allKeys;
  }
}
