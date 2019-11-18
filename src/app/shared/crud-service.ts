import { take, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export class CrudService<Type> {

  constructor(
    protected http: HttpClient,
    private API_URL,
  ) { }

  list() {
    return this.http.get<Type[]>(this.API_URL)
      .pipe(
        delay(2000),
        take(1)
      );
  }

  loadById(id) {
    return this.http.get<Type>(`${this.API_URL}/${id}`).pipe(take(1));
  }

  private create(record: Type) {
    return this.http.post(this.API_URL, record).pipe(take(1));
  }

  private update(record: Type) {
    return this.http.put(`${this.API_URL}/${record['id']}`, record).pipe(take(1));
  }

  save(record: Type) {
    if (record['id']) {
      return this.update(record);
    }
    return this.create(record);
  }

  remove(id) {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(take(1));
  }
}
