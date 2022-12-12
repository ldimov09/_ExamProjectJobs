import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortText'
})
export class ShortTextPipe implements PipeTransform {

    transform( value: string, args?:any){
        if(!value) return null;        
        let sliceN = args;

        if(value.length > sliceN){
            value = value.slice(0, sliceN)+"...";
        }

        return value;
    }

}
