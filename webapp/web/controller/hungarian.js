define(function(){
  "use strict";
  var hungarian= function(){
    this.he = this.h();
  };
  hungarian.prototype = {
    computeAssignment: function(matrix){
      matrix = this.checkMatrix(matrix);
      matrix = this.reduceMatrix(matrix);
      console.log("matrix before:",matrix);
      console.log("reduce matrix",this.reduceMatrix(matrix));
      console.log("matrix after:",matrix);
      var startsByRow = new Array(matrix.length),
          startsByCol = new Array(matrix.length),
          primesByRow = new Array(matrix.length),
          coveredRows = new Array(matrix.length),
          coveredCols = new Array(matrix.length);
      startsByRow = this.initArr(startsByRow, -1);
      startsByCol = this.initArr(startsByCol, -1);
      primesByRow = this.initArr(primesByRow, -1);
      coveredRows = this.initArr(coveredRows);
      coveredCols = this.initArr(coveredCols);
      debugger
      this.initStars(matrix, startsByRow, startsByCol);
      this.coveredColumnsOfStarredZeroes(startsByCol,coveredCols);

      var count = 0;
      while(!this.allAreCovered(coveredCols)){
        // for(var n = 0; n < coveredCols.length; n++){

        // }
        var primedZero = this.primeSomeUncoveredZero(matrix, primesByRow, coveredRows, coveredCols);
        count +=1;
        while(primedZero === null){
          this.makeMoreZeroes(matrix,coveredRows,coveredCols);
          primedZero = this.primeSomeUncoveredZero(matrix, primesByRow, coveredRows, coveredCols);
        }
        var columnIndex = startsByRow[primedZero[0]];
        if(columnIndex === -1){
          this.incrementSetOfStarredZeroes(primedZero, starsByRow, starsByCol, primesByRow);
          primesByRow = this.initArr(primesByRow,-1);
          coveredCols = this.initArr(coveredCols, 0);
          coveredRows = this.initArr(coveredRows, 0);
          this.coveredColumnsOfStarredZeroes(startsByCol, coveredCols);
        }else{
          coveredRows[primedZero[0]] = 1;
          coveredCols[columnIndex] = 0;
        }

      }
      var retval = new Array(matrix.length);
      for(var i = 0; i < startsByCol.length; i++){
        retval[i] = new Array(startsByCol[i],i);
      }
      return retval;
    },
    allAreCovered: function(coveredCols){
      coveredCols.forEach(function(ele, index, arr){
        if(0 == ele){
          return false;
        }
      });
      return true;
    },
    reduceMatrix: function(matrix){
      for(var i = 0; i < matrix.length; i++){
        var minValInRow = Number.MAX_VALUE;
        for(var j = 0; j < matrix[i].length; j++){
          if(minValInRow > matrix[i][j]){
            minValInRow = matrix[i][j];
          }
        }

        for(var j = 0; j < matrix[i].length; j++){
          matrix[i][j] -= minValInRow;
        }
      }

      for(var i =0; i< matrix[0].length; i++){
        var minValInCol = Number.MAX_VALUE;
        for(var j = 0; j< matrix.length; j++){
          if(minValInCol > matrix[j][i]){
            minValInCol = matrix[j][i];
          }
        }

        for(var j = 0; j < matrix.length; j++){
          matrix[j][i] -= minValInCol;
        }
      }
      return matrix;
    },
    checkMatrix: function(matrix){
      var temp = null;
      if(matrix.length > matrix[0].length){
        temp = new Array(matrix.length);
        for(var n = 0; n< temp.length; n++){
          temp[n] = new Array(matrix.length);
        }
        for( var i = 0; i < temp.length; i++){
          for(var j = 0; j < temp[i].length; j++){
            if(j<matrix[0].length){
              temp[i][j]=matrix[i][j];
            }else{
              temp[i][j]=0;
            }
          }
        }
        return temp;
      }
      else if(matrix[0].length>matrix.length){
        temp = new Array(matrix[0].length);
        for(var n = 0; n< temp.length; n++){
          temp[n] = new Array(matrix[0].length);
        }
        for(var i =0; i< temp.length;i++){
          for(var j=0; j < temp[0].length; j++){
            if(i<matrix.length){
              temp[i][j] = matrix[i][j];
            }else{
              temp[i][j] = 0;
            }
          }
        }
        return temp;
      }
      return matrix;
    },
    initStars: function(matrix, startsByRow, startsByCol){
      var rowHasStarredZero = new Array(matrix.length);
      var colHasStarredZero = new Array(matrix.length);
      rowHasStarredZero = this.initArr(rowHasStarredZero);
      colHasStarredZero = this.initArr(colHasStarredZero);
      for(var i = 0; i< matrix.length; i++){
        for(var j = 0; j < matrix[i].length; j++){
          if(0 == matrix[i][j] && 0 == rowHasStarredZero[i] && 0 == colHasStarredZero[j]){
            startsByRow[i] = j;
            startsByCol[j] = i;
            rowHasStarredZero[i] = 1;
            colHasStarredZero[j] = 1;
            break;
          }
        }
      }
      console.log("initStars:", startsByRow, startsByCol);
    },
    coveredColumnsOfStarredZeroes: function(startsByCol, coveredCols){
      for( var i =0; i < startsByCol.length; i++){
        coveredCols[i] = -1 == startsByCol[i]? 0: 1;
      }
      console.log("coverColumnsOfStarredZeroes:", coveredCols);
    },
    primeSomeUncoveredZero: function(matrix, primesByRow, coveredRows, coveredCols){
      for( var i = 0; i < matrix.length; i++){
        if(i == coveredRows[i]) continue;
        for( var j = 0; j< matrix[i].length; j++){
          if(0 == matrix[i][j] && 0 == coveredCols[j]){
            primesByRow[i] = j;
            return new Array(i, j);
          }
        }
      }
      console.log("primeSomeUncoveredZero");
    },
    incrementSetOfStarredZeroes: function(unpairedZeroPrime, startsByRow, startsByCol, primesByRow){
      var i, j = unpairedZeroPrime[1];

      var zeroSequence = new Array();
      zeroSequence.push(unpairedZeroPrime);
      var paired = false;
      do{
        i = startsByCol[j];
        paired = -1 != i && zeroSequence.push(new Array(i,j));
        if(!paired) break;

        j = primesByRow[i];
        paired = -1 != j && zeroSequence.push(new Array(i,j));

      }while(paired);
      zeroSequence.forEach(function(ele, index, array){
        if(startsByCol[ele[1]] == ele[0]){
          startsByCol[ele[1]] = -1;
          startsByRow[ele[1]] = -1;
        }
        if(primesByRow[ele[0]] == ele[1]){
          startsByRow[ele[0]] = ele[1];
          startsByCol[ele[1]] = ele[0];
        }
      });

    },
    makeMoreZeroes: function(matrix, coveredRows, coveredCols){
      var minUncoveredValue = Number.MAX_VALUE;
      for( var i = 0; i < matrix.length; i++){
        if( 0 == coveredRows[i]){
          for( var j = 0; j < matrix[i].length; j++){
            if( 0 == coveredCols[j] && matrix[i][j] < minUncoveredValue){
              minUncoveredValue = matrix[i][j];
            }
          }
        }
      }

      for( var i = 0; i < coveredRows.length; i++){
        if(1 == coveredRows[i]){
          for( var j = 0; j < matrix[j].length; j++){
            matrix[i][j] += minUncoveredValue;
          }
        }
      }

      for(var i = 0; i < coveredCols.length; i++){
        if(0 == coveredCols[i]){
          for(var j = 0; j <matrix[i].length; j++){
            matrix[j][i] -= minUncoveredValue;
          }
        }
      }
    },
    initArr: function(arr, val){
      val = (val)?val:0;
      for(var i=0; i< arr.length; i++){
        arr[i] = val;
      }
      return arr;
    },
    h:function(){
      return "hi";
    }
  };
  return hungarian;
});
