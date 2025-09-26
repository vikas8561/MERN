# 2D Arrays in C++

A **2D array** is like a table (matrix) with rows and columns.

## Syntax
```cpp
data_type array_name[rows][cols];
```

---

## Example: Declaration and Printing
```cpp
#include <iostream>
using namespace std;

int main() {
    int arr[3][4] = {   // 3 rows, 4 columns
        {1, 2, 3, 4},
        {5, 6, 7, 8},
        {9, 10, 11, 12}
    };

    // Printing the 2D array
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 4; j++) {
            cout << arr[i][j] << " ";
        }
        cout << endl;
    }
    return 0;
}
```
**Output:**
```
1 2 3 4
5 6 7 8
9 10 11 12
```

---

# Common Questions on 2D Arrays

## 1. Find the sum of each row and each column
```cpp
#include <iostream>
using namespace std;

int main() {
    int arr[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };

    // Row sum
    for (int i = 0; i < 3; i++) {
        int rowSum = 0;
        for (int j = 0; j < 3; j++) {
            rowSum += arr[i][j];
        }
        cout << "Row " << i+1 << " sum = " << rowSum << endl;
    }

    // Column sum
    for (int j = 0; j < 3; j++) {
        int colSum = 0;
        for (int i = 0; i < 3; i++) {
            colSum += arr[i][j];
        }
        cout << "Column " << j+1 << " sum = " << colSum << endl;
    }
}
```

---

## 2. Transpose of a Matrix
(Switch rows to columns)
```cpp
#include <iostream>
using namespace std;

int main() {
    int arr[2][3] = {{1, 2, 3}, {4, 5, 6}};
    int transpose[3][2];

    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 3; j++) {
            transpose[j][i] = arr[i][j];
        }
    }

    cout << "Transpose:\n";
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 2; j++) {
            cout << transpose[i][j] << " ";
        }
        cout << endl;
    }
}
```

---

## 3. Search an element in a 2D array
```cpp
#include <iostream>
using namespace std;

int main() {
    int arr[3][3] = {
        {10, 20, 30},
        {40, 50, 60},
        {70, 80, 90}
    };

    int target = 50;
    bool found = false;

    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (arr[i][j] == target) {
                cout << "Found at row " << i << " col " << j << endl;
                found = true;
            }
        }
    }

    if (!found) cout << "Not found";
}
```

---

# Extra Practice Questions with Solutions

## Q3. Print the diagonal elements of a square matrix
```cpp
#include <iostream>
using namespace std;

int main() {
    int n = 3;
    int arr[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };

    cout << "Primary Diagonal: ";
    for (int i = 0; i < n; i++) {
        cout << arr[i][i] << " ";
    }
    cout << endl;

    cout << "Secondary Diagonal: ";
    for (int i = 0; i < n; i++) {
        cout << arr[i][n - i - 1] << " ";
    }
    cout << endl;

    return 0;
}
```

---

## Q4. Rotate a matrix by 90 degrees (clockwise)
```cpp
#include <iostream>
using namespace std;

int main() {
    int n = 3;
    int arr[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };

    // rotate by 90 degree
    /* 
        7 4 1
        8 5 2
        9 6 3
    */

    // Transpose the matrix
    for (int i = 0; i < n; i++) {
        for (int j = i; j < n; j++) {
            swap(arr[i][j], arr[j][i]);
        }
    }

    // Reverse each row
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n/2; j++) {
            swap(arr[i][j], arr[i][n - j - 1]);
        }
    }

    cout << "Rotated Matrix:\n";
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            cout << arr[i][j] << " ";
        }
        cout << endl;
    }
    return 0;
}
```

---

## Q6. Print the matrix in spiral order
```cpp
#include <iostream>
using namespace std;

int main() {
    int n = 4, m = 4;
    int arr[4][4] = {
        {1, 2, 3, 4},
        {5, 6, 7, 8},
        {9, 10, 11, 12},
        {13, 14, 15, 16}
    };

    // Spiral order
    // 1 2 3 4 8 12 16 15 14 13 9 5 6 7 11 10

    int top = 0, bottom = n - 1;
    int left = 0, right = m - 1;

    cout << "Spiral Order: ";
    while (top <= bottom && left <= right) {
        // Print top row
        for (int i = left; i <= right; i++)
            cout << arr[top][i] << " ";
        top++;

        // Print right column
        for (int i = top; i <= bottom; i++)
            cout << arr[i][right] << " ";
        right--;

        // Print bottom row
        if (top <= bottom) {
            for (int i = right; i >= left; i--)
                cout << arr[bottom][i] << " ";
            bottom--;
        }

        // Print left column
        if (left <= right) {
            for (int i = bottom; i >= top; i--)
                cout << arr[i][left] << " ";
            left++;
        }
    }
    cout << endl;
    return 0;
}
```
