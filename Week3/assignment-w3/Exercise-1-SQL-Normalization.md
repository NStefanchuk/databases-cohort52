+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
| member_id | member_name   | member_address | dinner_id | dinner_date | venue_id | venue_description | food_id | food_description |
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
|         1 | Amit          | 325 Max park   | D00001001 | 2020-03-15  | B01        | Grand Ball Room   | C1, C2    | Curry, Cake      |
|         2 | Ben           | 24 Hudson lane | D00001002 | 2020/03/15  | B02        | Zoku Roof Top     | S1, C2    | Soup, Cake       |
|         3 | Cristina      | 516 6th Ave    | D00001002 | 2020/03/15  | B02        | Zoku Roof Top     | S1, C2    | Soup, Cake       |
|         4 | Dan           | 89 John St     | D00001003 | 20-03-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
|         1 | Amit          | 325 Max park   | D00001003 | 20-03-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
|         3 | Cristina      | 516 6th Ave    | D00001004 | Mar 25 '20  | B04        | Mama's Kitchen    | F1, M1    | Falafal, Mousse  |
|         5 | Gabor         | 54 Vivaldi St  | D00001005 | Mar 26 '20  | B05        | Hungry Hungary    | G1, P2    | Goulash, Pasca   |
|         6 | Hema          | 9 Peter St     | D00001003 | 01-04-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+

1. What columns violate 1NF?
food_id, food_description, dinner_date

2. What entities do you recognize that could be extracted?
Member — club member
Dinner — dinner event
Venue — event venue
Food — dishes
DinnerFood — dishes served at the dinner
DinnerAttendance — member attendance at the dinner

3. Name all the tables and columns that would make a 3NF compliant solution.

### 1. members  
Stores information about club members.

| Column Name     | Description         | Key         |
|-----------------|---------------------|-------------|
| member_id       | Unique member ID    | Primary Key |
| member_name     | Member's full name  |             |
| member_address  | Member's address    |             |

---

### 2. venues  
Stores information about event venues.

| Column Name        | Description            | Key         |
|--------------------|------------------------|-------------|
| venue_id         | Unique venue code      | Primary Key |
| venue_description  | Description of venue   |             |

---

### 3. dinners  
Stores information about dinner events.

| Column Name   | Description           | Key                                 |
|----------------|-----------------------|-------------------------------------|
| dinner_id      | Unique dinner ID      | Primary Key                         |
| dinner_date    | Date of the dinner    |                                     |
| venue_id     | Reference to venue    | Foreign Key (venues.venue_id)     |

---

### 4. foods  
Stores information about dishes.

| Column Name       | Description           | Key         |
|-------------------|-----------------------|-------------|
| food_id         | Unique food code      | Primary Key |
| food_description  | Description of dish   |             |

---

### 5. dinner_foods  
Maps which foods were served at each dinner

| Column Name   | Description            | Key                                 |
|---------------|------------------------|-------------------------------------|
| dinner_id     | Reference to dinner    | Foreign Key (dinners.dinner_id)     |
| food_id     | Reference to food      | Foreign Key (foods.food_id)       |
| Primary Key   | Composite key          | (dinner_id, food_id)              |

---

### 6. dinner_attendance  
Maps which members attended which dinners 

| Column Name   | Description            | Key                                 |
|---------------|------------------------|-------------------------------------|
| dinner_id     | Reference to dinner    | Foreign Key (dinners.dinner_id)     |
| member_id     | Reference to member    | Foreign Key (members.member_id)     |
| Primary Key   | Composite key          | (dinner_id, member_id)              |
