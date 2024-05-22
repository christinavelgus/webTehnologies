import {makeAutoObservable} from "mobx";
export default class DeviceStore {
    constructor() {
        this._types = []
        this._brands = []
        this._devices = []
        this._baskets = []
        this._orders = []
        this._selectedType = {}
        this._selectedBrand = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 8
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }
    setOrders(orders) {
        console.log(orders) 
        this._orders = orders.sort(function (a, b) {
            if (a.id > b.id) {
              return 1;
            }
            if (a.id < b.id) {
              return -1;
            }
            return 0;
          });
    }
    setBrands(brands) {
        this._brands = brands
    }
    setDevices(devices) {
        this._devices = devices
    }
    setBaskets(basket){
        this._baskets = basket
    }
    setSelectedType(type) {
        this.setPage(1)
        this._selectedType = type
    }
    setSelectedBrand(brand) {
        this.setPage(1)
        this._selectedBrand = brand
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }
    

    get devices() {
        return this._devices
    }
    get orders() {
        return this._orders
    }
    get types() {
        return this._types
    }
    get brands() {
        return this._brands
    }
    get selectedType() {
        return this._selectedType
    }
    get basket() {
        return this._baskets
    }
    get selectedBrand() {
        return this._selectedBrand
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}