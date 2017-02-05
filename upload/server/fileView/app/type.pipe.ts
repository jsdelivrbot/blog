import {Pipe, PipeTransform } from '@angular/core';
import { fileInfo } from './fileInfo';
@Pipe({
  name: 'typePipe',
  pure: false
})
export class TypePipe implements PipeTransform {
  transform(data: fileInfo[], types: any[]): fileInfo[] {
      //searchTerm = searchTerm.toUpperCase();
      return data.filter(item => 
      {
          let match:boolean  = false;
          types.forEach(type =>
          {
          //当类型匹配，并且该复选框被选中时    
          if((type.value === item.fileType) &&
           (type.checked === true))
          {
              match = true;
          }
          //all被选中时
          else if((type.value === "All") &&
           (type.checked === true))
          {
              match = true;
          }  
          });
          return match;
      }
      );
  }
}