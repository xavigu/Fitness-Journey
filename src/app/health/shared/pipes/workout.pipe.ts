import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'workout'})
export class WorkoutPipe implements PipeTransform {
  transform(value: any): any {
    if (value.type === 'endurance') {
      return `
        Distance: ${value.endurance.distance + 'km'}, 
        Duration: ${value.endurance.duration + 'mins'} 
      `
    } else {
      return `
        Weight: ${value.strength.weight+ 'kgs'}, 
        Sets: ${value.strength.sets}, 
        Reps: ${value.strength.reps} 
      `
    }
  }
}